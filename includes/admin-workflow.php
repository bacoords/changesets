<?php
/**
 * Small admin review and publish workflow for Changesets.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * URL for reviewing a changeset in wp-admin.
 *
 * @param int $changeset_id Changeset ID.
 * @return string
 */
function cs_review_url( $changeset_id ) {
	return add_query_arg(
		array( 'page' => 'cs-review', 'changeset_id' => (int) $changeset_id ),
		admin_url( 'admin.php' )
	);
}

/**
 * Register a review page reached from the Changesets list.
 */
function cs_register_review_page() {
	add_submenu_page(
		null,
		__( 'Review Changeset', 'changesets' ),
		__( 'Review Changeset', 'changesets' ),
		'manage_changesets',
		'cs-review',
		'cs_render_review_page'
	);
}
add_action( 'admin_menu', 'cs_register_review_page' );

/**
 * Add the review link after the plugin's existing Preview row action.
 *
 * @param array   $actions Row actions.
 * @param WP_Post $post    List row post.
 * @return array
 */
function cs_add_review_row_action( $actions, $post ) {
	if ( $post && 'changeset' === $post->post_type && current_user_can( 'manage_changesets' ) ) {
		$actions['cs_review'] = sprintf(
			'<a href="%s">%s</a>',
			esc_url( cs_review_url( $post->ID ) ),
			esc_html__( 'Review & publish', 'changesets' )
		);
	}
	return $actions;
}
add_filter( 'post_row_actions', 'cs_add_review_row_action', 20, 2 );

/**
 * Render an admin page with the changeset contents and workflow actions.
 */
function cs_render_review_page() {
	if ( ! current_user_can( 'manage_changesets' ) ) {
		wp_die( esc_html__( 'You cannot review changesets.', 'changesets' ) );
	}

	$changeset_id = isset( $_GET['changeset_id'] ) ? absint( $_GET['changeset_id'] ) : 0;
	$changeset    = cs_get_changeset( $changeset_id );
	if ( ! $changeset ) {
		wp_die( esc_html__( 'Changeset not found.', 'changesets' ) );
	}

	$status       = cs_get_changeset_status( $changeset_id );
	$staged_ids   = cs_get_staged_drafts( $changeset_id );
	$options      = cs_get_staged_options( $changeset_id );
	$styles       = cs_get_staged_global_styles( $changeset_id );
	$variation    = cs_get_staged_style_variation( $changeset_id );
	$notice       = isset( $_GET['cs_notice'] ) ? sanitize_key( wp_unslash( $_GET['cs_notice'] ) ) : '';
	$partial_key  = 'cs_publish_result_' . get_current_user_id() . '_' . $changeset_id;
	$partial      = 'partial' === $notice ? get_transient( $partial_key ) : false;
	if ( $partial ) {
		delete_transient( $partial_key );
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_the_title( $changeset ) ); ?></h1>
		<p><?php echo esc_html( sprintf( __( 'Changeset status: %s', 'changesets' ), $status ) ); ?></p>
		<p><a class="button" href="<?php echo esc_url( cs_get_preview_url( $changeset_id ) ); ?>"><?php esc_html_e( 'Preview Changeset', 'changesets' ); ?></a></p>

		<?php if ( 'approved' === $notice ) : ?>
			<div class="notice notice-success"><p><?php esc_html_e( 'Changeset approved.', 'changesets' ); ?></p></div>
		<?php elseif ( 'published' === $notice ) : ?>
			<div class="notice notice-success"><p><?php esc_html_e( 'Changeset published.', 'changesets' ); ?></p></div>
		<?php elseif ( $partial ) : ?>
			<div class="notice notice-error"><p><?php esc_html_e( 'Some content could not be published. The changeset remains approved; resolve the failures, then retry.', 'changesets' ); ?></p>
				<ul>
				<?php foreach ( $partial['failed_items'] as $item ) : ?>
					<li><?php echo esc_html( sprintf( __( 'Staged post %1$d: %2$s', 'changesets' ), $item['staged_id'], $item['reason'] ) ); ?></li>
				<?php endforeach; ?>
				</ul>
			</div>
		<?php endif; ?>

		<h2><?php esc_html_e( 'Staged content', 'changesets' ); ?></h2>
		<?php if ( $staged_ids ) : ?>
			<table class="widefat striped">
				<thead><tr><th><?php esc_html_e( 'Title', 'changesets' ); ?></th><th><?php esc_html_e( 'Post type', 'changesets' ); ?></th><th><?php esc_html_e( 'Change', 'changesets' ); ?></th></tr></thead>
				<tbody>
				<?php foreach ( $staged_ids as $staged_id ) : ?>
					<?php $staged = get_post( $staged_id ); ?>
					<?php if ( ! $staged ) { continue; } ?>
					<tr>
						<td><?php echo esc_html( get_the_title( $staged ) ); ?></td>
						<td><?php echo esc_html( $staged->post_type ); ?></td>
						<td><?php echo esc_html( cs_get_staged_source_id( $staged_id ) ? __( 'Update', 'changesets' ) : __( 'New', 'changesets' ) ); ?></td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
		<?php else : ?>
			<p><?php esc_html_e( 'No staged content.', 'changesets' ); ?></p>
		<?php endif; ?>

		<?php if ( $options ) : ?>
			<h2><?php esc_html_e( 'Staged settings', 'changesets' ); ?></h2>
			<p><?php echo esc_html( implode( ', ', array_keys( $options ) ) ); ?></p>
		<?php endif; ?>
		<?php if ( $styles || $variation ) : ?>
			<h2><?php esc_html_e( 'Staged styles', 'changesets' ); ?></h2>
			<p><?php echo esc_html( $variation ? $variation : __( 'Global styles', 'changesets' ) ); ?></p>
		<?php endif; ?>

		<?php if ( 'open' === $status && cs_user_can_approve_changeset( $changeset_id ) ) : ?>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php wp_nonce_field( 'cs_review_' . $changeset_id ); ?>
				<input type="hidden" name="action" value="cs_review_action">
				<input type="hidden" name="operation" value="approve">
				<input type="hidden" name="changeset_id" value="<?php echo esc_attr( $changeset_id ); ?>">
				<?php submit_button( __( 'Approve Changeset', 'changesets' ) ); ?>
			</form>
		<?php elseif ( 'approved' === $status && cs_user_can_publish_changeset( $changeset_id ) ) : ?>
			<p><?php esc_html_e( 'Publishing applies the staged changes to the live site.', 'changesets' ); ?></p>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php wp_nonce_field( 'cs_review_' . $changeset_id ); ?>
				<input type="hidden" name="action" value="cs_review_action">
				<input type="hidden" name="operation" value="publish">
				<input type="hidden" name="changeset_id" value="<?php echo esc_attr( $changeset_id ); ?>">
				<?php submit_button( __( 'Publish Changeset', 'changesets' ), 'primary' ); ?>
			</form>
		<?php endif; ?>
	</div>
	<?php
}

/**
 * Process nonce-protected admin approval and publishing requests.
 */
function cs_handle_review_action() {
	if ( 'POST' !== $_SERVER['REQUEST_METHOD'] || ! current_user_can( 'manage_changesets' ) ) {
		wp_die( esc_html__( 'You cannot perform this action.', 'changesets' ), '', array( 'response' => 403 ) );
	}

	$changeset_id = isset( $_POST['changeset_id'] ) ? absint( $_POST['changeset_id'] ) : 0;
	$operation    = isset( $_POST['operation'] ) ? sanitize_key( wp_unslash( $_POST['operation'] ) ) : '';
	check_admin_referer( 'cs_review_' . $changeset_id );

	if ( 'approve' === $operation ) {
		$result = cs_approve_changeset( $changeset_id );
		$notice = 'approved';
	} elseif ( 'publish' === $operation ) {
		$result = cs_publish_changeset( $changeset_id );
		$notice = is_array( $result ) && ! empty( $result['partial_success'] ) ? 'partial' : 'published';
		if ( 'partial' === $notice ) {
			set_transient( 'cs_publish_result_' . get_current_user_id() . '_' . $changeset_id, $result, 5 * MINUTE_IN_SECONDS );
		}
	} else {
		wp_die( esc_html__( 'Unknown Changeset action.', 'changesets' ), '', array( 'response' => 400 ) );
	}

	if ( is_wp_error( $result ) ) {
		wp_die( esc_html( $result->get_error_message() ), '', array( 'back_link' => true, 'response' => 400 ) );
	}

	wp_safe_redirect( add_query_arg( 'cs_notice', $notice, cs_review_url( $changeset_id ) ) );
	exit;
}
add_action( 'admin_post_cs_review_action', 'cs_handle_review_action' );
