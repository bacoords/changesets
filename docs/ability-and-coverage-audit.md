# MCP abilities and changeset coverage audit

This is a snapshot of the `experiments` baseline (0.5.3). It records current behavior and proposes the next experiments; it does not expand staging by itself.

## How the MCP integration works today

The plugin registers eight WordPress Abilities in `abilities/register.php`. Each has `meta.public = true` and `show_in_rest = true`. With the [MCP Adapter default server](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/default-server.md), an authenticated MCP client uses three tools to discover abilities, inspect one ability's schema, and execute it. The Changesets abilities are not eight separate default-server MCP tools. The adapter also applies each ability's permission callback when it executes it.

| Ability | Current role |
| --- | --- |
| `changesets/status` | Plugin readiness and user capability summary. |
| `changesets/create` | Create an open changeset and preview UUID. |
| `changesets/list` | List open or approved changesets. |
| `changesets/get` | Return staged content, settings, and styles for one changeset. |
| `changesets/save` | Dispatch `content`, `styles`, or `setting` input to plugin-specific staging functions. |
| `changesets/approve` | Mark a changeset approved. |
| `changesets/publish` | Apply staged changes to live content after approval. |
| `changesets/discard` | Discard a changeset and its staged drafts. |

Typical flow: `create` → one or more `save` calls → `get`/preview → `approve` → `publish`. `list` and `status` support discovery; `discard` ends an unused session. The [CLI transport guide](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/cli-usage.md) describes connecting to the same default server through WP-CLI.

### Relationship to other abilities

`changesets/save` manually dispatches three input types. It does not invoke existing Core or third-party abilities and there is no registry through which another ability can declare a stage, preview, and publish implementation. The only explicit staging extension filter found here is `cs_denylisted_options`.

The [WordPress Abilities API](https://developer.wordpress.org/apis/abilities-api/php-reference/) permits calling another ability's `execute()` method, but an arbitrary ability may change live state immediately. Calling it during staging would not create a previewable changeset. A proposed extension should require a staging contract, not infer that every exposed ability is stageable.

### API review points

- The single `changesets/save` schema describes three different payload shapes. Separate typed abilities, or a schema that validates each variant, would give clients clearer input and errors.
- Review permission callbacks per operation and per source object. `cs_user_can_manage_changesets()` falls back to `edit_posts`; approving and publishing fall back to post or page publishing capabilities. Confirm these match the intended roles for settings and site-wide styles.
- Keep lifecycle checks in shared functions used by both admin and MCP. On the baseline, `cs_ability_publish_changeset()` checks approval, while direct `cs_publish_changeset()` does not. PR #3 moves that guard into the shared service and rejects MCP saves after approval.
- Define what partial publish means for clients. A result can report failed items after other items have changed live; the operation is not atomic. PR #3 keeps failed staged items available for retry.
- Consider a handler registry with explicit `validate`, `stage`, `describe`, `preview`, `publish`, and `discard` operations. Each handler needs object-level permission checks. Migrate one existing non-post path, such as settings, into the registry as a proof of the contract before generalizing it.

## What can enter a changeset today?

| Entity | Current support | Gap to investigate |
| --- | --- | --- |
| Posts and pages | Existing or new content can be staged. Title, content, excerpt, featured image, and built-in categories/tags are applied for existing items. | Existing slug, parent, menu order, arbitrary post meta, and custom taxonomies are not applied on publish. |
| Public custom post types | Allowed when both `public` and `show_ui` are true. | The same field and taxonomy gaps apply; no per-type field policy exists. |
| Templates, template parts, navigation | Explicitly allowed by `cs_is_stageable_post_type()`. | Staged draft lookups use `post_type => 'any'`, which excludes types with `exclude_from_search = true`. This can omit them from review and publish. PR #1 addresses the query. Type-specific metadata and taxonomies still need end-to-end checks. |
| Synced patterns (`wp_block`) | Excluded by the current stageable-type rule. | Evaluate as an early internal post-type pilot. |
| Global styles (`wp_global_styles`) | Supported through the special styles and variation path, stored on the changeset. | It is not handled as a general post type; check preview/publish parity and failure reporting for style updates. |
| Options and theme modifications | Most keys can be staged, except a denylist of bootstrap and security-sensitive options. | Non-string values are generally cast to strings, so structured option values need a type-preserving policy. |
| Attachments and media | Attachment references, such as featured image and site icon IDs, can be staged. | Uploads themselves are live immediately; attachment objects are not staged. Define whether media should remain an explicit exception. |
| Other internal post types | Generally excluded. | Audit each type for useful staging semantics. Revisions, menu items, font records, and system objects need individual decisions rather than a blanket enablement. |

On the Studio test site, `wp_template`, `wp_template_part`, `wp_navigation`, and `wp_block` are all marked `exclude_from_search`. WordPress documents that [`post_type => 'any'` excludes those types](https://developer.wordpress.org/reference/classes/wp_query/). A temporary staged `wp_template` draft was missed by that query and found by an explicit post-type list.

## Recommended next experiments

1. Merge PR #1 before relying on internal post types in list, review, or publish flows. Merge PR #3 before adding another publish entry point.
2. Add a type-by-type test matrix for create, update, preview, inspect, approve, publish, and discard. Start with page, `wp_template`, `wp_template_part`, `wp_navigation`, and `wp_block`.
3. Define a field map for each supported type, including registered meta and taxonomies, and verify that preview and publish apply the same fields.
4. Decide how an *active editing changeset* differs from the current preview cookie. Existing front-end preview filters do not intercept ordinary wp-admin or REST saves. Map each admin write path before promising that all admin changes will be staged.
5. Keep the review payloads available through MCP abilities. The wp-admin workspace experiment was removed; changesets are managed through abilities while the admin bar indicates an active preview.

The goal is broad coverage for meaningful post types, including internal types. Explicit exceptions should have a reason and a visible fallback so users know when an admin action will change the live site.
