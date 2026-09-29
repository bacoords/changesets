<?php
/**
 * Changeset review data shared by MCP abilities. No admin screen is registered.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Prepare one changeset for MCP review.
 *
 * @param WP_Post $changeset Changeset post.
 * @param bool    $include_changes Include staged content details.
 * @return array
 */
function cs_review_serialize_changeset( $changeset, $include_changes = false ) {
	$id     = (int) $changeset->ID;
	$status = cs_get_changeset_status( $id );
	$modified = get_post_modified_time( 'c', true, $changeset );
	if ( ! $modified ) {
		$modified = get_post_modified_time( 'c', false, $changeset );
	}
	$modified = $modified ? (string) $modified : '';
	$data   = array(
		'id'          => $id,
		'title'       => get_the_title( $changeset ),
		'status'      => $status,
		'modified'    => $modified,
		'preview_url' => 'published' === $status ? '' : cs_get_preview_url( $id ),
		'exit_preview_url' => add_query_arg( 'cs_exit_preview', '1', home_url( '/' ) ),
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
	$data['theme_json']  = cs_review_get_theme_json( $id );
	$data['theme_json_changes'] = $data['theme_json'] && $data['theme_json']['staged']
		? cs_review_theme_json_changes( $data['theme_json']['current'], $data['theme_json']['staged'] )
		: array();
	$data['styles']      = null !== $data['theme_json'];
	$data['can_approve'] = 'open' === $status && cs_user_can_approve_changeset( $id );
	$data['can_publish'] = 'approved' === $status && cs_user_can_publish_changeset( $id );
	$data['exit_url']    = cs_get_active_preview_uuid() === cs_get_changeset_uuid( $id )
		? $data['exit_preview_url']
		: '';

	return $data;
}

/**
 * Compare live and staged global styles for MCP review.
 *
 * @param object|array $current Current live user-level theme.json data.
 * @param object|array $staged  Staged user-level theme.json data.
 * @return array Changed paths and values.
 */
function cs_review_theme_json_changes( $current, $staged ) {
	$changes = array();
	$compare = function ( $before, $after, $path, $before_set, $after_set ) use ( &$compare, &$changes ) {
		$is_record = function ( $value ) {
			return is_object( $value ) || ( is_array( $value ) && $value && array_keys( $value ) !== range( 0, count( $value ) - 1 ) );
		};
		$before_record = $before_set && $is_record( $before );
		$after_record  = $after_set && $is_record( $after );

		if ( ( $before_record || ! $before_set ) && ( $after_record || ! $after_set ) ) {
			$before_values = $before_record ? (array) $before : array();
			$after_values  = $after_record ? (array) $after : array();
			foreach ( array_unique( array_merge( array_keys( $before_values ), array_keys( $after_values ) ) ) as $key ) {
				$compare(
					isset( $before_values[ $key ] ) ? $before_values[ $key ] : null,
					isset( $after_values[ $key ] ) ? $after_values[ $key ] : null,
					array_merge( $path, array( $key ) ),
					array_key_exists( $key, $before_values ),
					array_key_exists( $key, $after_values )
				);
			}
			return;
		}

		if ( $before_set !== $after_set || wp_json_encode( $before ) !== wp_json_encode( $after ) ) {
			$name      = implode( '.', $path );
			$changes[] = array(
				'id'          => $name,
				'path'        => $name,
				'current'     => $before_set ? $before : null,
				'staged'      => $after_set ? $after : null,
				'current_set' => $before_set,
				'staged_set'  => $after_set,
			);
		}
	};

	$compare( $current, $staged, array(), true, true );
	return $changes;
}

/**
 * Return the staged user-level theme.json data and current live overrides.
 * Reading the published global styles post directly keeps preview filters out
 * of the comparison when the reviewer is already previewing a changeset.
 *
 * @param int $changeset_id Changeset ID.
 * @return array|null
 */
function cs_review_get_theme_json( $changeset_id ) {
	$staged    = cs_get_staged_global_styles( $changeset_id );
	$variation = cs_get_staged_style_variation( $changeset_id );
	$error     = '';

	if ( ! $staged && $variation ) {
		$resolved = cs_resolve_style_variation( $variation );
		if ( is_wp_error( $resolved ) ) {
			$error = $resolved->get_error_message();
		} else {
			$staged = $resolved['data'];
		}
	}
	if ( ! $staged && ! $variation ) {
		return null;
	}

	$live_post = WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( wp_get_theme() );
	$current   = isset( $live_post['post_content'] ) ? json_decode( $live_post['post_content'], true ) : array();
	$current   = is_array( $current ) ? $current : array();
	$staged    = is_array( $staged ) ? $staged : array();
	unset( $current['isGlobalStylesUserThemeJSON'], $staged['isGlobalStylesUserThemeJSON'] );

	$title = get_post_meta( $changeset_id, '_changeset_staged_style_variation_title', true );

	return array(
		'current'   => (object) $current,
		'staged'    => $error ? null : (object) $staged,
		'variation' => $title ? (string) $title : $variation,
		'error'     => $error,
	);
}

/**
 * Return all non-trashed changesets, newest first.
 *
 * @return array
 */
function cs_review_list_changesets() {
	$posts = get_posts(
		array(
			'post_type'      => 'changeset',
			'post_status'    => array( 'draft', 'pending', 'publish', 'private' ),
			'posts_per_page' => -1,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);

	return array_map( 'cs_review_serialize_changeset', $posts );
}
