# Requirements for full changeset editing in wp-admin

This is an implementation inventory, not an enabled workflow. Today a changeset is created and changed through the Changesets abilities. Its UUID cookie previews staged data on the front end only. Opening wp-admin or the Site Editor while that cookie is present shows live data, and ordinary editor saves still write to the live site. The plugin continues to hide its staged drafts from the normal Posts and Pages lists so they are not mistaken for ordinary drafts.

The current code paths are in [`includes/changesets.php`](../includes/changesets.php), [`abilities/register.php`](../abilities/register.php), and [`includes/admin.php`](../includes/admin.php). The prior [coverage audit](ability-and-coverage-audit.md) describes the earlier baseline; this list covers the complete admin editing problem against the current branch.

## Required changes

1. **Define an explicit editing session.** Opening a changeset in wp-admin would need an authenticated, capability-checked changeset ID, independent of the public preview cookie. It needs a clear entry and exit path, status indicator, and rules for links between admin screens. A front-end preview link must never silently turn a later admin Save into a staged write.

2. **Make editor reads changeset aware.** The Post and Site Editors use [Core Data entity records](https://developer.wordpress.org/block-editor/reference-guides/data/data-core/) loaded through REST. For an active editing session, single-record and collection reads would have to return staged values under stable entity IDs, including existing-source-to-staged mappings and newly staged records. Other admin sessions and public REST consumers must continue to receive live data. Editor preloads, cache invalidation, and internal REST requests need the same rule.

3. **Route every editor write to staging.** [Core Data saves](https://developer.wordpress.org/block-editor/how-to-guides/data-basics/3-building-an-edit-form/) normally send REST requests that update the real entity. A changeset-aware save service must instead create or update its staged record and return a response the editor can continue editing. Cover create, update, delete/reset, autosave, revision restore, multi-entity Save, and retries. Classic forms, Quick Edit, bulk actions, and third-party editors need either an equivalent staging adapter or an explicit block against writing live while in a changeset. UI-only interception is insufficient.

4. **Complete post and custom-post-type field parity.** Existing staged posts currently copy and publish title, content, excerpt, featured image, and built-in categories/tags. A full editor must also round-trip slug, parent, menu order, author, status/schedule, template assignment, registered meta, custom taxonomies, and type-specific fields. It must support deliberate removal of values. Stageable post types need explicit capability and field policies; `wp_block` and other internal types are not generally supported today.

5. **Model templates, template parts, navigation, and synced patterns as editor entities.** [Template](https://developer.wordpress.org/rest-api/reference/wp_templates/) and [template-part](https://developer.wordpress.org/rest-api/reference/wp_template_parts/) REST IDs include theme and slug and may refer to a theme file with no database post. The staged representation must preserve theme, slug, area, source, and references, then handle create/update/reset/delete without making a file-backed template or reusable component live early. Navigation and synced patterns need their own mapping and publish rules.

6. **Integrate Global Styles end to end.** The Site Editor reads and updates user styles through the [Global Styles REST controller](https://developer.wordpress.org/reference/classes/wp_rest_global_styles_controller/), while the current plugin stores a theme.json-shaped payload on changeset post meta and overlays it only during front-end rendering. The editor must load the staged style origin, update that payload when controls are saved, render its CSS in the editor canvas, and handle style variations, presets, resets, and revisions. Publish must create a user `wp_global_styles` record when absent, check write errors, and retain staged data on failure. It must not attempt to edit the theme's on-disk `theme.json` through this path.

7. **Support typed settings and references.** Admin settings and Site Editor values can be arrays, booleans, numbers, IDs, or theme modifications. `cs_stage_option()` currently casts most non-reference values to strings. A complete editing path needs registered schemas, validation, storage-aware reads/writes, preview parity, and ID remapping for pages and attachments. Denylisted bootstrap/security options remain outside the changeset. Media uploads currently enter the live library immediately; either stage the assets or show that exception clearly.

8. **Keep the review and publish contract accurate.** Capture a baseline revision for every touched entity; detect changes made live since staging; show field-level differences and conflicts before approval. Any edit after approval needs an explicit reopen/reapproval rule. Publishing should validate the whole set first, report per-entity results, and define rollback or recovery for partial application. Current publish can apply some posts before another fails, and its Global Styles write result is not checked.

9. **Enforce permissions at every boundary.** Loading a staged entity, saving it, deleting it, approving it, and publishing it each need server-side checks for both the changeset capability and the source object's capability. REST requests need WordPress nonce or application-password authentication; a public preview link grants no editing rights. Editor links and returned staged IDs must not expose private changesets through normal admin or REST lists.

10. **Build a truthful admin experience.** Only after the read/write paths work should an authenticated changeset workspace offer a changes list, edit links, previews, errors, conflicts, approval, and publish. The editor must visibly distinguish staged Save from live Publish. Unsupported controls must say that they will change the live site or be disabled. Use WordPress Design System components and the existing editor patterns rather than a parallel custom editor.

## Acceptance matrix

For each supported entity type—page, post, public CPT, template, template part, navigation, synced pattern, Global Styles, and setting—verify:

| Step | Required result |
| --- | --- |
| Open | Editor shows the staged version, or clones the live version into this changeset. |
| Save and reload | Edits persist only in the changeset, with stable IDs and editor state. |
| Preview | Front end and editor canvas represent the same staged content and styles. |
| Inspect | Review and MCP report the same fields, diffs, and links. |
| Approve | Only an authorized reviewer can approve the exact reviewed revision. |
| Publish | The live entity gains every supported staged field or reports a recoverable failure. |
| Discard | Staged records and references disappear without changing live data. |

Also run the matrix with a second user, a stale live source, an expired session, public and private previews, and a failed mid-publish operation. Until these conditions pass, wp-admin is a live editor even when a browser is previewing a changeset on the front end.
