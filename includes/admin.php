<?php
/**
 * Preview controls in the WordPress admin bar when available and a
 * standalone preview bar for visitors without the admin bar.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render the same escaped badge in the native and logged-out preview bars.
 *
 * @param string $title Changeset title.
 * @return string Badge markup.
 */
function cs_changeset_badge_html( $title ) {
	$accessible_label = sprintf(
		/* translators: %s: changeset title. */
		__( 'Active changeset: %s', 'changesets' ),
		$title
	);
	$icon = '<svg class="cs-changeset-badge__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="6" cy="3" r="2"/><circle cx="6" cy="21" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 5v14M18 8a6 6 0 0 1-6 6H6"/></svg>';
	return '<span class="cs-changeset-badge" aria-label="' . esc_attr( $accessible_label ) . '">' . $icon . '<span class="cs-changeset-badge__label">' . esc_html( $title ) . '</span></span>';
}

/**
 * Exit preview while keeping the visitor on the current page.
 *
 * @return string Exit preview URL.
 */
function cs_get_current_exit_preview_url() {
	return add_query_arg(
		array(
			'cs_exit_preview' => '1',
			'changeset'        => false,
		)
	);
}

/**
 * Render the standalone Changeset bar when there is no native admin bar.
 */
function cs_render_changeset_bar() {
	if ( is_admin_bar_showing() ) {
		return;
	}

	$uuid = cs_get_active_preview_uuid();
	if ( ! $uuid ) {
		return;
	}

	$changeset = cs_get_changeset( $uuid );
	if ( ! $changeset || ! cs_user_can_preview_changeset( $changeset->ID ) ) {
		return;
	}

	$title  = get_the_title( $changeset );
	$status = cs_get_changeset_status( $changeset->ID );
	?>
	<div class="dcp-changeset-bar" role="banner" aria-label="<?php echo esc_attr__( 'Changeset preview', 'changesets' ); ?>">
		<div class="dcp-changeset-bar__label">
			<button
				type="button"
				class="dcp-changeset-bar__trigger"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-label="<?php echo esc_attr( sprintf( __( 'Share changeset: %s', 'changesets' ), $title ) ); ?>"
			>
				<?php echo cs_changeset_badge_html( $title ); // Escaped in helper. ?>
			</button>
			<?php if ( $status && 'open' !== $status ) : ?>
				<span class="dcp-changeset-bar__status"><?php echo esc_html( $status ); ?></span>
			<?php endif; ?>
		</div>
	</div>
	<script>
		(function() {
			var bar = document.querySelector('.dcp-changeset-bar');
			if (!bar) {
				return;
			}
			function positionBar() {
				var adminBar = document.getElementById('wpadminbar');
				var adminHeight = adminBar ? adminBar.offsetHeight : 0;
				var barHeight = bar.offsetHeight;
				bar.style.top = adminHeight + 'px';
				document.documentElement.style.setProperty('--cs-preview-bar-height', barHeight + 'px');
				document.documentElement.style.setProperty('--cs-preview-admin-height', adminHeight + 'px');
				document.documentElement.style.setProperty('margin-top', (adminHeight + barHeight) + 'px', 'important');
			}
			positionBar();
			window.addEventListener('resize', positionBar);
			if (window.ResizeObserver) {
				new ResizeObserver(positionBar).observe(bar);
			}
		})();
	</script>
	<?php
}
add_action( 'wp_body_open', 'cs_render_changeset_bar', 1 );
add_action( 'wp_footer', 'cs_render_changeset_bar_footer_fallback', 999 );

/**
 * Fallback if the theme never calls wp_body_open.
 */
function cs_render_changeset_bar_footer_fallback() {
	if ( did_action( 'wp_body_open' ) ) {
		return;
	}
	cs_render_changeset_bar();
}

/**
 * Add the active changeset badge as its own admin bar item.
 *
 * @param WP_Admin_Bar $admin_bar Admin bar instance.
 */
function cs_add_admin_bar_menu( $admin_bar ) {
	if ( is_admin() || ! is_user_logged_in() ) {
		return;
	}

	$uuid      = cs_get_active_preview_uuid();
	$changeset = $uuid ? cs_get_changeset( $uuid ) : null;
	if ( ! $changeset || ! cs_user_can_preview_changeset( $changeset->ID ) ) {
		return;
	}

	$admin_bar->add_node(
		array(
			'id'    => 'changesets-share',
			'title' => cs_changeset_badge_html( get_the_title( $changeset ) ),
			'href'  => cs_get_preview_url( $changeset->ID ),
			'meta'  => array(
				'class' => 'cs-changesets-share-trigger',
				'title' => __( 'Share changeset', 'changesets' ),
			),
		)
	);
}
// Core adds site-name at priority 30 and Edit Site at 40.
add_action( 'admin_bar_menu', 'cs_add_admin_bar_menu', 39 );

/**
 * Prepare the active changeset's compact sharing controls.
 *
 * @param WP_Post $changeset Changeset.
 * @return array
 */
function cs_changeset_share_data( $changeset ) {
	$id     = (int) $changeset->ID;
	$status = cs_get_changeset_status( $id );
	$can_manage_sharing = current_user_can( 'manage_changesets' ) && in_array( $status, array( 'open', 'approved' ), true );

	return array(
		'changesetId'        => $id,
		'title'              => get_the_title( $changeset ),
		'status'             => $status,
		'shareUrl'           => cs_get_preview_url( $id ),
		'visibility'         => cs_get_changeset_visibility( $id ),
		'effectiveVisibility' => cs_get_effective_changeset_visibility( $id ),
		'sharing'            => $can_manage_sharing
			? array(
				'url'   => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'cs_set_changeset_visibility_' . $id ),
			)
			: null,
		'approval'           => 'open' === $status && cs_user_can_approve_changeset( $id )
			? array(
				'url'   => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'cs_approve_changeset_' . $id ),
			)
			: null,
		'exitUrl'            => cs_get_current_exit_preview_url(),
		'labels'             => array(
			'shareTrigger'         => __( 'Share changeset', 'changesets' ),
			'shareHeading'         => __( 'Share changeset', 'changesets' ),
			'close'                => __( 'Close sharing menu', 'changesets' ),
			'copyLink'             => __( 'Copy link', 'changesets' ),
			'copied'               => __( 'Link copied', 'changesets' ),
			'copyError'            => __( 'Could not copy the link. Copy it from the address bar instead.', 'changesets' ),
			'visibility'           => __( 'Visibility', 'changesets' ),
			'visibilityPublicShort' => __( 'Public', 'changesets' ),
			'visibilityLoggedInShort' => __( 'Logged in', 'changesets' ),
			'visibilityPublic'     => __( 'Anyone with the link', 'changesets' ),
			'visibilityLoggedIn'   => __( 'Signed-in users', 'changesets' ),
			'visibilityCapability' => __( 'Changeset managers', 'changesets' ),
			'visibilityOverride'   => __( 'Site-wide private previews restrict access to changeset managers.', 'changesets' ),
			'visibilityLoginHint'  => __( 'People opening this link will need to sign in.', 'changesets' ),
			'visibilityManagerHint' => __( 'Only changeset managers can open this link.', 'changesets' ),
			'saving'               => __( 'Saving…', 'changesets' ),
			'saved'                => __( 'Sharing settings saved.', 'changesets' ),
			'saveError'            => __( 'Could not save sharing settings. Please try again.', 'changesets' ),
			'approve'              => __( 'Approve', 'changesets' ),
			'approving'            => __( 'Approving…', 'changesets' ),
			'approveError'         => __( 'Could not approve this changeset. Please try again.', 'changesets' ),
			'exit'                 => __( 'Exit', 'changesets' ),
		),
	);
}

/**
 * Approve from the authenticated front-end sharing menu. No public AJAX action exists.
 */
function cs_ajax_approve_changeset() {
	$changeset_id = isset( $_POST['changeset_id'] ) ? absint( wp_unslash( $_POST['changeset_id'] ) ) : 0;
	check_ajax_referer( 'cs_approve_changeset_' . $changeset_id, 'nonce' );
	if ( ! $changeset_id || ! cs_user_can_approve_changeset( $changeset_id ) ) {
		wp_send_json_error( array( 'message' => __( 'You cannot approve this changeset.', 'changesets' ) ), 403 );
	}
	$result = cs_approve_changeset( $changeset_id );
	if ( is_wp_error( $result ) ) {
		wp_send_json_error( array( 'message' => $result->get_error_message() ), 400 );
	}
	wp_send_json_success( array( 'status' => cs_get_changeset_status( $changeset_id ) ) );
}
add_action( 'wp_ajax_cs_approve_changeset', 'cs_ajax_approve_changeset' );

/**
 * Update sharing from the front-end menu. The nonce protects the request and
 * the changeset service enforces the manager capability and status rules.
 */
function cs_ajax_set_changeset_visibility() {
	$changeset_id = isset( $_POST['changeset_id'] ) ? absint( wp_unslash( $_POST['changeset_id'] ) ) : 0;
	check_ajax_referer( 'cs_set_changeset_visibility_' . $changeset_id, 'nonce' );
	if ( ! $changeset_id || ! current_user_can( 'manage_changesets' ) ) {
		wp_send_json_error( array( 'message' => __( 'You cannot change this changeset\'s sharing settings.', 'changesets' ) ), 403 );
	}
	$visibility = isset( $_POST['visibility'] ) ? sanitize_key( wp_unslash( $_POST['visibility'] ) ) : '';
	$result     = cs_set_changeset_visibility( $changeset_id, $visibility );
	if ( is_wp_error( $result ) ) {
		wp_send_json_error( array( 'message' => $result->get_error_message() ), 400 );
	}
	wp_send_json_success(
		array(
			'visibility'          => cs_get_changeset_visibility( $changeset_id ),
			'effectiveVisibility' => cs_get_effective_changeset_visibility( $changeset_id ),
		)
	);
}
add_action( 'wp_ajax_cs_set_changeset_visibility', 'cs_ajax_set_changeset_visibility' );

/**
 * Load WPDS tokens and the front-end changeset sharing menu when needed.
 */
function cs_enqueue_preview_controls() {
	if ( ! cs_is_frontend_preview_context() ) {
		return;
	}
	$uuid = cs_get_active_preview_uuid();
	$changeset = $uuid ? cs_get_changeset( $uuid ) : null;
	if ( ! $changeset || ! cs_user_can_preview_changeset( $changeset->ID ) ) {
		return;
	}

	wp_enqueue_script(
		'cs-changeset-share',
		CS_URL . 'assets/changeset-share.js',
		array( 'wp-element', 'wp-components' ),
		CS_VERSION,
		true
	);
	wp_localize_script( 'cs-changeset-share', 'csChangesetShare', cs_changeset_share_data( $changeset ) );
	wp_enqueue_style( 'cs-preview-controls', CS_URL . 'assets/preview-controls.css', array( 'wp-theme', 'wp-components' ), CS_VERSION );
}
add_action( 'wp_enqueue_scripts', 'cs_enqueue_preview_controls' );

/**
 * Mark preview sessions on <html> for admin-bar-like offset.
 *
 * @param array $classes Classes.
 * @return array
 */
function cs_previewing_admin_body_class( $classes ) {
	$uuid      = cs_get_active_preview_uuid();
	$changeset = $uuid ? cs_get_changeset( $uuid ) : null;
	if ( ! is_admin_bar_showing() && $changeset && cs_user_can_preview_changeset( $changeset->ID ) ) {
		$classes[] = 'dcp-previewing';
	}
	return $classes;
}
add_filter( 'body_class', 'cs_previewing_admin_body_class' );
