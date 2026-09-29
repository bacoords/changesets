# Changesets

Accumulate site edits in a staging Changeset, preview them on the live site without touching production, then Publish Changeset after human approval.

## For agents

**Agent prompt** (paste-ready):

> You have access to a WordPress site. Before staging changes: (1) Check that WordPress 7.0+, Gutenberg, Changesets, and WordPress MCP Adapter are installed and active by verifying `changesets/*` abilities are available via MCP. (2) If missing, explain which plugins are required, ask permission to install, then install if allowed. (3) Once plugins are active, ensure MCP connection with Application Password. Then workflow: create changeset → stage changes with changesets/save (type: content/styles/setting) → give a human reviewer the preview URL. The reviewer approves in the preview sharing menu or through authenticated MCP access; an authorized publisher may then call changesets/publish. Never edit live content directly unless human explicitly requests a repair outside Changesets.

**Setup checklist** (verify BEFORE asking for credentials):
1. Is the site running WordPress 7.0+ with Gutenberg, Changesets, and MCP Adapter active?
2. Verify by checking if `changesets/*` abilities are available via MCP tools
3. If missing: Ask permission to install, then install if allowed
4. Only after plugins are active: Request Application Password / MCP connection if not connected

**Why**: Site URL alone ≠ MCP access. You need the adapter plugin + authenticated connection for `changesets/*` tools to appear.

**Critical rule**: Never edit live posts, options, or styles directly. Use Changesets abilities only. Only bypass Changesets if human explicitly asks for a live repair.

**Workflow**:
1. **Create a changeset**: `changesets/create` → returns `{ preview_url, uuid, changeset_id }`
2. **Stage work**: `changesets/save` with one of three `type` values:
   - `content` — page/post/template/template-part/navigation/CPT
   - `styles` — global styles and style variations
   - `setting` — site options (blogname, page_on_front, etc.)
3. **Preview**: Give the human the `?changeset=<uuid>` URL for review
4. **Approve**: A signed-in reviewer with `approve_changesets` approves in the preview sharing menu or via `changesets/approve`
5. **Publish**: An account with `publish_changesets` calls `changesets/publish` after approval

Use `changesets/list` with `status: "all"` to inspect all changesets, including published ones. Use `changesets/get` for staged content, settings, theme.json changes, preview links, and available actions.

**What stages**: Content (pages, posts, templates, template parts, navigation, custom post types), global styles, style variations, and settings (site title, homepage, site logo, site icon, featured images).

**Media policy**: Attachment posts are never staged in changesets. Uploads go directly to the Media Library and persist even if the changeset is discarded. Changesets stage only references: featured images (`featured_media`), site logo (`custom_logo`), site icon (`site_icon`), and content HTML/blocks containing attachment IDs.

**Settings**: Site options and theme_mods are staged via `type=setting`. The plugin auto-detects storage type (option vs theme_mod) for known keys like `custom_logo` (theme_mod) and `site_icon` (option).

See [readme.txt](readme.txt) for complete documentation.

## Setup

**Requirements**: Hosted WordPress 7.0+ and the Gutenberg plugin (not Playground)

1. Install and activate **Gutenberg** and **Changesets** on your WordPress site
2. Install and activate **WordPress MCP Adapter** for agent access
3. Create an Application Password (propose-only user without publish permissions recommended)
4. Connect your MCP client to the site using the Application Password

Changesets has no wp-admin screen. Create, inspect, approve, and publish changesets through its abilities. During an active front-end preview, the changeset badge opens a WordPress Design System sharing popover. Anyone who can preview may copy its link; changeset managers can set who may view it. Authorized reviewers may approve there, and signed-in visitors can exit from the popover. Logged-out visitors see the same sharing popover and a separate Exit Changeset control in the preview bar. Use `changesets/get` through MCP for the complete list of staged changes.

**Front-end preview only**: The preview cookie and URL affect front-end pages, not wp-admin, the Site Editor, REST, AJAX, or CLI requests. Editing in wp-admin still changes the live site. See the [wp-admin editing requirements](docs/wp-admin-editing-requirements.md) for the work needed before editing a changeset there can be supported safely.

**Per-changeset visibility**: New changesets default to `public` (anyone with the UUID link), preserving the existing preview behavior. Pass `visibility` to `changesets/create` or change an open or approved changeset with `changesets/set-visibility` (requires `manage_changesets`). Supported values are `public`, `logged_in` (any WordPress user), and `capability` (users with `manage_changesets`). `changesets/list` and `changesets/get` return both the stored `visibility` and `effective_visibility`.

To change the default for **new** changesets, set `CHANGESETS_DEFAULT_VISIBILITY` to one of those values in `wp-config.php`, for example `define( 'CHANGESETS_DEFAULT_VISIBILITY', 'logged_in' );`. Existing changesets without stored visibility retain the public-link behavior. An invalid configured value fails closed to `capability`. `changesets/status` reports the default and whether the site-wide override is active. The setting below always overrides per-changeset visibility.

**Private preview mode** (optional): Require logged-in users with `manage_changesets` capability to preview changesets. Add to `wp-config.php`:

```php
define( 'CHANGESETS_PRIVATE_PREVIEWS', true );
```

When enabled, only logged-in users with `manage_changesets` can use `?changeset=<uuid>` preview URLs, even if a changeset is marked `public` or `logged_in`.

**Approval**: An authenticated reviewer with `approve_changesets` can approve from the sharing popover or through `changesets/approve`. The action records the approver and time and moves an open changeset to `approved`; it does not publish any staged edits. The popover never shows Approve to a public visitor or a user without that capability. `changesets/publish` separately requires `publish_changesets` and refuses to publish until approval. Give proposing agents an account without either approval or publishing capability so they cannot approve their own work.

## License

GPLv2 or later
