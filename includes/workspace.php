<?php
/**
 * Route-based Changesets workspace and its REST data source.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once CS_PATH . 'build/build.php';

/**
 * URL for the workspace or one of its routes.
 *
 * @param string $route Internal route path.
 * @return string
 */
function cs_workspace_url( $route = '/' ) {
	$url = admin_url( 'tools.php?page=changesets-wp-admin' );
	return '/' === $route ? $url : add_query_arg( 'p', $route, $url );
}

/**
 * URL for reviewing a changeset in the workspace.
 *
 * @param int $changeset_id Changeset ID.
 * @return string
 */
function cs_review_url( $changeset_id ) {
	return cs_workspace_url( '/review/' . (int) $changeset_id );
}

/**
 * Place the generated wp-admin workspace under Tools.
 */
function cs_register_workspace_menu() {
	add_submenu_page(
		'tools.php',
		__( 'Changesets', 'changesets' ),
		__( 'Changesets', 'changesets' ),
		'manage_changesets',
		'changesets-wp-admin',
		'cs_changesets_wp_admin_render_page'
	);
}
add_action( 'admin_menu', 'cs_register_workspace_menu' );

/**
 * Route bundles use apiFetch; Core's Boot prerequisites do not include it.
 *
 * @param string $hook_suffix Admin page hook.
 */
function cs_workspace_enqueue_api_fetch( $hook_suffix ) {
	if ( 'tools_page_changesets-wp-admin' === $hook_suffix ) {
		wp_enqueue_script( 'wp-api-fetch' );
		wp_enqueue_style( 'cs-design-tokens', CS_URL . 'build/vendor/design-tokens.css', array(), CS_VERSION );
		wp_enqueue_style( 'cs-dataviews', CS_URL . 'build/vendor/dataviews.css', array( 'wp-components', 'cs-design-tokens' ), CS_VERSION );
		wp_style_add_data( 'cs-dataviews', 'rtl', 'replace' );
	}
}
add_action( 'admin_enqueue_scripts', 'cs_workspace_enqueue_api_fetch', 5 );

/**
 * Preserve bookmarks to the former post list and review page.
 */
function cs_redirect_classic_changeset_list() {
	if ( ! current_user_can( 'manage_changesets' ) ) {
		return;
	}

	global $pagenow;
	if ( 'admin.php' === $pagenow && isset( $_GET['page'] ) && 'changesets-wp-admin' === sanitize_key( wp_unslash( $_GET['page'] ) ) ) {
		$route = isset( $_GET['p'] ) ? sanitize_text_field( wp_unslash( $_GET['p'] ) ) : '/';
		wp_safe_redirect( cs_workspace_url( $route ) );
		exit;
	}
	if ( 'edit.php' === $pagenow && isset( $_GET['post_type'] ) && 'changeset' === sanitize_key( wp_unslash( $_GET['post_type'] ) ) ) {
		wp_safe_redirect( cs_workspace_url() );
		exit;
	}
	if ( 'admin.php' === $pagenow && isset( $_GET['page'] ) && 'cs-review' === sanitize_key( wp_unslash( $_GET['page'] ) ) ) {
		$id = isset( $_GET['changeset_id'] ) ? absint( $_GET['changeset_id'] ) : 0;
		wp_safe_redirect( cs_workspace_url( '/review/' . $id ) );
		exit;
	}
}
// Run before Core checks access to unregistered legacy plugin pages.
add_action( 'admin_menu', 'cs_redirect_classic_changeset_list', 1 );

/**
 * Check access to the workspace REST API.
 *
 * @return bool
 */
function cs_workspace_can_manage() {
	return current_user_can( 'manage_changesets' );
}

/**
 * Register data and workflow endpoints for the route-based UI.
 */
function cs_register_workspace_rest_routes() {
	register_rest_route(
		'changesets/v1',
		'/workspace',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'cs_workspace_list_changesets',
			'permission_callback' => 'cs_workspace_can_manage',
		)
	);

	register_rest_route(
		'changesets/v1',
		'/workspace/(?P<id>\d+)',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'cs_workspace_get_changeset',
			'permission_callback' => 'cs_workspace_can_manage',
		)
	);

	register_rest_route(
		'changesets/v1',
		'/workspace/(?P<id>\d+)/(?P<operation>approve|publish)',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'cs_workspace_run_action',
			'permission_callback' => 'cs_workspace_can_manage',
		)
	);
}
add_action( 'rest_api_init', 'cs_register_workspace_rest_routes' );

/**
 * Prepare one changeset for the UI.
 *
 * @param WP_Post $changeset Changeset post.
 * @param bool    $include_changes Include staged content details.
 * @return array
 */
function cs_workspace_serialize_changeset( $changeset, $include_changes = false ) {
	$id     = (int) $changeset->ID;
	$status = cs_get_changeset_status( $id );
	$data   = array(
		'id'          => $id,
		'title'       => get_the_title( $changeset ),
		'status'      => $status,
		'modified'    => get_post_modified_time( 'c', true, $changeset ),
		'preview_url' => 'published' === $status ? '' : cs_get_preview_url( $id ),
		'review_url'  => cs_workspace_url( '/review/' . $id ),
	);

	if ( ! $include_changes ) {
		return $data;
	}

	$data['content'] = array();
	foreach ( cs_get_staged_drafts( $id ) as $staged_id ) {
		$staged = get_post( $staged_id );
		if ( ! $staged ) {
			continue;
		}
		$source_id         = cs_get_staged_source_id( $staged_id );
		$data['content'][] = array(
			'id'        => (int) $staged_id,
			'title'     => get_the_title( $staged ),
			'post_type' => $staged->post_type,
			'change'    => $source_id ? 'update' : 'new',
			'source_id' => $source_id,
		);
	}

	$data['settings']    = array_keys( cs_get_staged_options( $id ) );
	$data['styles']      = (bool) ( cs_get_staged_global_styles( $id ) || cs_get_staged_style_variation( $id ) );
	$data['can_approve'] = 'open' === $status && cs_user_can_approve_changeset( $id );
	$data['can_publish'] = 'approved' === $status && cs_user_can_publish_changeset( $id );
	$data['exit_url']    = cs_get_active_preview_uuid() === cs_get_changeset_uuid( $id )
		? add_query_arg( 'cs_exit_preview', '1', cs_workspace_url( '/review/' . $id ) )
		: '';

	return $data;
}

/**
 * Return all non-trashed changesets, newest first.
 *
 * @return array
 */
function cs_workspace_list_changesets() {
	$posts = get_posts(
		array(
			'post_type'      => 'changeset',
			'post_status'    => array( 'draft', 'pending', 'publish', 'private' ),
			'posts_per_page' => -1,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);

	return array_map( 'cs_workspace_serialize_changeset', $posts );
}

/**
 * Return one changeset with its staged entities.
 *
 * @param WP_REST_Request $request REST request.
 * @return array|WP_Error
 */
function cs_workspace_get_changeset( $request ) {
	$changeset = cs_get_changeset( absint( $request['id'] ) );
	if ( ! $changeset || 'trash' === $changeset->post_status ) {
		return new WP_Error( 'cs_not_found', __( 'Changeset not found.', 'changesets' ), array( 'status' => 404 ) );
	}

	return cs_workspace_serialize_changeset( $changeset, true );
}

/**
 * Run the existing approval or publishing workflow from the new UI.
 *
 * @param WP_REST_Request $request REST request.
 * @return array|WP_Error
 */
function cs_workspace_run_action( $request ) {
	$id        = absint( $request['id'] );
	$operation = $request['operation'];
	$result    = 'approve' === $operation ? cs_approve_changeset( $id ) : cs_publish_changeset( $id );
	if ( is_wp_error( $result ) ) {
		return $result;
	}

	return array(
		'result'    => $result,
		'changeset' => cs_workspace_serialize_changeset( cs_get_changeset( $id ), true ),
	);
}
