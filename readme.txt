=== Changesets ===
Contributors: richtabor
Requires at least: 7.0
Tested up to: 7.1
Requires Plugins: gutenberg
Requires PHP: 7.4
Stable tag: 0.5.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Accumulate site edits in a staging Changeset, preview them on the live site without touching production, then Publish Changeset after human approval. Built for AI agents and humans using the WordPress Abilities API.

== Description ==

Changesets introduces staging sessions where agents and humans accumulate site edits before publishing.

**Workflow**: Agent stages edits → human previews live site with overlay → human approves → Publish Changeset applies all changes.

The live site stays untouched until Publish. Preview shows exactly what visitors will see after publish.

**v0.5.1** expands settings staging with denylist approach:
- **Settings**: Most options/theme_mods are now stageable. A denylist blocks unsafe keys (active_plugins, template, siteurl, permalink_structure, etc.). All others allowed: blogname, posts_per_page, comment_registration, discussion settings, etc.
- **Media policy**: Attachments never staged — uploads go to Media Library (persist on discard); only references (IDs) are staged
- **Preview truthfulness**: Preview dynamically overlays all staged settings (not just hardcoded keys)

**v0.4.0** introduces unified `changesets/save` ability for full site staging:
- **Content**: Pages, posts, templates, template parts, navigation, and custom post types
- **Styles**: Global styles and style variations
- **Settings**: Site title, homepage settings, and more

Exposes Abilities (`changesets/create`, `changesets/save`, `changesets/approve`, `changesets/publish`) so compatible agents can discover the workflow via the Abilities API.

Pair with the WordPress MCP Adapter (separate plugin) for desktop/API agent access.

**Note**: This plugin works with own-site MCP connections only (not Playground).

== Installation ==

1. Install on WordPress 7.0+ and activate the Gutenberg plugin.
2. Activate Changesets.
3. (Optional) Install MCP Adapter for agent transport.
4. Use a propose-only Application Password user without `publish_posts` / `edit_published_posts`.

== For agents ==

**Setup requirements** (check FIRST, before credentials):

1. **Required plugins for MCP**: Gutenberg, Changesets, and WordPress MCP Adapter must be installed and active
2. **How to verify**: Try calling `changesets/*` abilities via MCP. If not available, the plugins are missing.
3. **If missing**: Explain which plugins are required for the MCP workflow. Ask permission to install them (or guide the human to install them). Then install if allowed.
4. **Only after plugins are active**: Request Application Password / MCP connection if not already connected.

**Critical**: Site URL alone does not give you MCP access. You need the MCP Adapter plugin installed and an authenticated connection to call `changesets/*` abilities.

**Workflow**:
1. **Create a changeset**: `changesets/create` → returns `{ preview_url, uuid, changeset_id }`
2. **Stage work**: `changesets/save` with one of three `type` values:
   - `content` — page/post/template/template-part/navigation/CPT. Pass `source_id` to stage an existing entity for editing; omit `source_id` to create a new one. Include `title`, `content`, etc.
   - `styles` — global styles. Pass `variation` (style variation name) and/or `settings`/`styles` (theme.json patches).
   - `setting` — site option. Pass `key` (e.g. `blogname`, `show_on_front`, `page_on_front`) and `value`.
3. **Inspect**: `changesets/list` with `status: "all"` returns the dashboard list, including published changesets, preview and review links, and change counts. `changesets/get` returns the staged content, settings, theme.json comparison, links, and available actions shown in the dashboard review, plus full staged payloads.
4. **Preview**: Give the human the `?changeset=<uuid>` URL (or `preview_url` from create). **Wait for human approval.**
5. **Publish**: After human approval, call `changesets/approve`, then `changesets/publish` to apply all changes to the live site.

**Never edit live content directly**. Always use the Changesets workflow. If the human explicitly asks you to repair something live outside of Changesets, only do so after confirming that's what they want.

**Preview notes**: The preview query parameter is `changeset` (cookie name is the same). Exit preview via "Exit Changeset" admin bar link or `?exit_changeset=1`.

**UI note**: Review changesets under Tools → Changesets. Open changesets let authorized users edit staged content blocks and selected staged global colors before approval. Agents can use `changesets/update-staged-content` with a revision from `changesets/get` for the same draft edits, or `changesets/save` with `type=styles` for style patches. Authorized users can approve and publish in the dashboard; agents can use the corresponding abilities.

**Agent brief** (paste-ready):
You have access to a WordPress 7.0+ site. Before staging changes, verify Gutenberg, Changesets, and WordPress MCP Adapter are installed and active. If missing, ask permission to install them. Once active and connected: (1) create a changeset, (2) stage all changes using changesets/save (type: content/styles/setting), (3) give the human the preview URL and wait for approval, (4) after approval call changesets/approve then changesets/publish. Never edit live content directly.

== Changelog ==

= 0.5.3 =
* Fix: Changeset bar now stacks correctly with WordPress admin bar — site header content no longer clipped underneath.
* Change: Simplified preview bar implementation with lean JS-based positioning (measures actual admin bar height for precise stacking).

= 0.5.2 =
* New: Private preview mode via `CHANGESETS_PRIVATE_PREVIEWS` constant — when enabled, preview requires logged-in user with `manage_changesets` capability.

= 0.5.1 =
* Change: Settings staging now uses a denylist approach — most options and theme_mods are stageable unless they affect bootstrap or security (active_plugins, template, stylesheet, siteurl, home, permalink_structure, rewrite_rules, category_base, tag_base). Previously only seven keys were allowed.
* Change: Preview dynamically applies filters for all staged options/theme_mods (not just hardcoded keys). Previews are now truthful for any allowed setting.
* New: `cs_denylisted_options` filter allows developers to add or remove keys from the denylist.
* Improved: Ability schema description clarifies denylist model and provides more setting examples (posts_per_page, comment_registration, etc.).

= 0.5.0 =
* New: Featured image support — stage `featured_media` or `thumbnail_id` (attachment ID) when saving content via `changesets/save` type=content.
* New: Site logo support — stage `custom_logo` (theme_mod) via `changesets/save` type=setting.
* New: Site icon support — stage `site_icon` (option) via `changesets/save` type=setting.
* New: Settings storage distinguishes options vs theme_mods — pass optional `store` field or rely on auto-detection for known keys (custom_logo is theme_mod).
* Change: `cs_stage_option` now accepts optional `store` parameter ('option' or 'theme_mod') with backward compatibility for old calls.
* Change: Publish Changeset remaps attachment IDs (site_icon, custom_logo) to final live IDs when they reference staged content.
* Change: Preview filters added for `site_icon` (option) and `custom_logo` (theme_mod) during changeset preview.
* Policy: Attachment posts are NEVER staged in changesets — uploads go to Media Library as normal (persist on discard); changesets stage only references (IDs in content/settings/featured images).

= 0.4.2 =
* Fix: Publish Changeset now correctly publishes new pages (source_id=0) by clearing staged markers before status change, preventing the staged-publish guard from blocking.
* Fix: Settings that reference staged content (e.g. page_on_front) are remapped to final live post IDs after content is published (order matters: content first, then settings).
* Fix: Publish returns accurate results with failed_items array when any item fails to reach publish status (no false success claims).
* New: `changesets/discard` ability — trash/discard an open changeset and delete all staged drafts; clears preview.
* New: `changesets/status` ability — readiness check returning plugin version, abilities registration status, current user capabilities, and open changeset count.
* Change: `changesets/get` now includes staged_options, staged_styles, and style_variation (full changeset review).
* Change: Improved agent setup guidance — agents must verify Changesets + MCP Adapter are installed before requesting credentials.

= 0.4.1 =
* Fix: Correct CPT and meta key naming for changeset operations.

= 0.4.0 =
* New: Unified `changesets/save` ability for content, styles, and settings.
* New: Support for staging templates (wp_template), template parts (wp_template_part), and navigation (wp_navigation).
* New: Support for staging global styles and style variations.
* New: Support for staging site settings (blogname, page_on_front, etc).
* New: Support for staging any public custom post type with show_ui.
* Breaking: Removed `changesets/stage` ability (replaced by `changesets/save` type=content).
* Change: Preview overlay now works with all stageable post types.
* Change: Publish Changeset now applies content, styles, and settings.

= 0.3.1 =
* Change: Rename ability `changesets/stage-page` to `changesets/stage`.

= 0.3.0 =
* Breaking: Product rename to Changesets (plugin name, text domain, user-facing strings).
* Breaking: Ability namespace changed from `draft-changes/*` to `changesets/*`.
* Breaking: CPT renamed from `dcp_changeset` to `changeset`.
* Breaking: Function prefixes changed from `dcp_*` to `cs_*`.
* Breaking: Post meta keys changed from `_dcp_*` to `_changeset_*`.
* Breaking: Exit query param changed from `dcp_exit_preview` to `exit_changeset`.
* Breaking: Simplified to 6 lean abilities: create, get, list, stage, approve, publish.
* Change: `changesets/stage` unifies stage-content, create-staged-page, and update-staged-content.
* Removed: update-changeset, stage-setting, stage-global-styles, stage-style-variation abilities.
* Note: No backward compatibility provided (unreleased experiment).

= 0.2.20 =
* Breaking: Remove legacy `dcp_changeset` query parameter and cookie support (no longer accepted).

= 0.2.19 =
* Change: Rename preview query parameter from `dcp_changeset` to `changeset` (backward compatible).

= 0.2.18 =
* Fix: Register ability category on wp_abilities_api_categories_init hook.

= 0.2.17 =
* Changeset architecture: staging sessions for site edits.
* Stage content, global styles, style variations, settings.
* Preview overlay on live site with admin bar.
* Approve and Publish Changeset workflow.
* Abilities API for agent integration.
