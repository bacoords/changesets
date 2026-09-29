# wp-build Changesets workspace experiment

The Changesets post type still stores each changeset. WordPress 7.0+ and the Gutenberg plugin are required. The plugin registers a route-based `Changesets` subpage under Tools at `tools.php?page=changesets-wp-admin`. Existing classic list and review bookmarks redirect to the workspace routes.

The page uses the experimental `@wordpress/build` page and file-based route APIs. The home route uses `DataViews` for changeset search, filtering, sorting, and pagination. The review route uses `DataViews` for staged content. The routes use `@wordpress/ui` Badge and Card, `@wordpress/components` controls, and WPDS design tokens where needed. The build bundles DataViews and UI because these packages do not expose WordPress script globals. The build copies the DataViews stylesheet and design tokens into `build/vendor`; the admin page enqueues them with `wp-components` as a dependency.

The route data comes from the read-only `changesets/v1/workspace` endpoint. Approve and publish actions call the plugin's existing workflow functions, with the same capabilities and approval gate. The admin screen cannot create changesets; use the `changesets/create` ability instead. The review route displays staged posts, settings, and a searchable comparison of staged global styles against current site overrides. It also exposes the complete staged theme.json-shaped data for inspection. These are WordPress user-level global styles; the theme's `theme.json` file is not modified. The review route does not yet edit staged content in place.

The MCP abilities share the dashboard's review data. `changesets/list` returns preview and review links, modified dates, and counts for content, settings, and styles; pass `status: "all"` to include published changesets as the dashboard does. `changesets/get` returns the dashboard's staged content list, setting names, theme.json data and changed paths, preview/review/exit links, and available actions, alongside its existing full staged payloads. `changesets/approve` and `changesets/publish` perform the dashboard's workflow actions with the same approval gate. An MCP client can use `search`, `sort_by`, `sort_order`, `page`, and `per_page` when listing changesets.

Build after changing the route source:

```sh
npm ci
npm run build
```

Commit the generated `build/` files with source changes. The post-build step keeps compact module wrappers for `SCRIPT_DEBUG`; both normal and debug modes were tested in Studio. This is an experimental branch: `@wordpress/build` pages and routes may change, and the list currently loads all changesets for client-side DataViews operations. A server-paginated endpoint would be appropriate for large sites.
