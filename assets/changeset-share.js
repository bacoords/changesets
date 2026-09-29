( function () {
	'use strict';

	function init() {
		var trigger = document.querySelector(
			'#wp-admin-bar-changesets-share > .ab-item, .dcp-changeset-bar__trigger'
		);
		var data = window.csChangesetShare;
		if ( ! trigger || ! data || ! window.wp || ! wp.element || ! wp.components ) {
			return;
		}

		var el = wp.element.createElement;
		var useState = wp.element.useState;
		var Button = wp.components.Button;
		var Dropdown = wp.components.Dropdown;
		var Notice = wp.components.Notice;
		var RadioControl = wp.components.RadioControl;
		var mount = document.createElement( 'div' );
		mount.id = 'cs-changeset-share-root';
		var isAdminBar = !! trigger.closest( '#wp-admin-bar-changesets-share' );
		trigger.parentNode.replaceChild( mount, trigger );
		var slotMount = null;
		if ( isAdminBar ) {
			slotMount = document.createElement( 'div' );
			slotMount.id = 'cs-changeset-share-slot';
			document.body.appendChild( slotMount );
		}

		function badge() {
			return el( 'span', { className: 'cs-changeset-badge' },
				el( 'svg', {
					className: 'cs-changeset-badge__icon', viewBox: '0 0 24 24',
					fill: 'none', stroke: 'currentColor', strokeWidth: 2,
					strokeLinecap: 'round', strokeLinejoin: 'round',
					'aria-hidden': 'true', focusable: 'false',
				},
					el( 'circle', { cx: 6, cy: 3, r: 2 } ),
					el( 'circle', { cx: 6, cy: 21, r: 2 } ),
					el( 'circle', { cx: 18, cy: 6, r: 2 } ),
					el( 'path', { d: 'M6 5v14M18 8a6 6 0 0 1-6 6H6' } )
				),
				el( 'span', { className: 'cs-changeset-badge__label' }, data.title )
			);
		}

		function postAction( endpoint, action, nonce, values, fallbackError ) {
			var body = new window.URLSearchParams();
			body.set( 'action', action );
			body.set( 'changeset_id', String( data.changesetId ) );
			body.set( 'nonce', nonce );
			Object.keys( values ).forEach( function ( key ) {
				body.set( key, values[ key ] );
			} );
			return window.fetch( endpoint, {
				method: 'POST',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				body: body.toString(),
			} ).then( function ( response ) {
				return response.text().then( function ( text ) {
					var payload;
					try {
						payload = JSON.parse( text );
					} catch ( error ) {
						throw new Error( fallbackError );
					}
					if ( ! response.ok || ! payload.success ) {
						throw new Error(
							payload.data && payload.data.message ? payload.data.message : fallbackError
						);
					}
					return payload.data;
				} );
			} );
		}

		function copyLink() {
			if ( window.navigator.clipboard && window.isSecureContext ) {
				return window.navigator.clipboard.writeText( data.shareUrl );
			}
			var field = document.createElement( 'textarea' );
			field.value = data.shareUrl;
			field.setAttribute( 'readonly', '' );
			field.style.position = 'fixed';
			field.style.opacity = '0';
			document.body.appendChild( field );
			field.select();
			var copied = document.execCommand( 'copy' );
			field.remove();
			return copied ? Promise.resolve() : Promise.reject( new Error( data.labels.copyError ) );
		}

		function App() {
			var anchorState = useState( null );
			var anchor = anchorState[ 0 ];
			var setAnchor = anchorState[ 1 ];
			var openState = useState( false );
			var isOpen = openState[ 0 ];
			var setOpen = openState[ 1 ];
			var visibilityState = useState( data.visibility );
			var visibility = visibilityState[ 0 ];
			var setVisibility = visibilityState[ 1 ];
			var draftState = useState( data.visibility );
			var draftVisibility = draftState[ 0 ];
			var setDraftVisibility = draftState[ 1 ];
			var effectiveState = useState( data.effectiveVisibility );
			var effectiveVisibility = effectiveState[ 0 ];
			var setEffectiveVisibility = effectiveState[ 1 ];
			var statusState = useState( data.status );
			var status = statusState[ 0 ];
			var setStatus = statusState[ 1 ];
			var busyState = useState( false );
			var isSaving = busyState[ 0 ];
			var setSaving = busyState[ 1 ];
			var approvalState = useState( false );
			var isApproving = approvalState[ 0 ];
			var setApproving = approvalState[ 1 ];
			var messageState = useState( '' );
			var message = messageState[ 0 ];
			var setMessage = messageState[ 1 ];
			var errorState = useState( '' );
			var errorMessage = errorState[ 0 ];
			var setErrorMessage = errorState[ 1 ];

			function share() {
				setMessage( '' );
				setErrorMessage( '' );
				copyLink().then( function () {
					setMessage( data.labels.copied );
				} ).catch( function () {
					setErrorMessage( data.labels.copyError );
				} );
			}

			function saveVisibility() {
				if ( ! data.sharing || isSaving || visibility === draftVisibility ) {
					return;
				}
				setSaving( true );
				setMessage( '' );
				setErrorMessage( '' );
				postAction(
					data.sharing.url,
					'cs_set_changeset_visibility',
					data.sharing.nonce,
					{ visibility: draftVisibility },
					data.labels.saveError
				).then( function ( result ) {
					setVisibility( result.visibility );
					setEffectiveVisibility( result.effectiveVisibility );
					setMessage( data.labels.saved );
				} ).catch( function ( error ) {
					setErrorMessage( error.message || data.labels.saveError );
				} ).finally( function () {
					setSaving( false );
				} );
			}

			function approve() {
				if ( ! data.approval || isApproving ) {
					return;
				}
				setApproving( true );
				setMessage( '' );
				setErrorMessage( '' );
				postAction(
					data.approval.url,
					'cs_approve_changeset',
					data.approval.nonce,
					{},
					data.labels.approveError
				).then( function ( result ) {
					setStatus( result.status );
				} ).catch( function ( error ) {
					setErrorMessage( error.message || data.labels.approveError );
				} ).finally( function () {
					setApproving( false );
				} );
			}

			var visibilityLabels = {
				public: data.labels.visibilityPublic,
				logged_in: data.labels.visibilityLoggedIn,
				capability: data.labels.visibilityCapability,
			};
			var audienceHint = effectiveVisibility === 'logged_in'
				? data.labels.visibilityLoginHint
				: effectiveVisibility === 'capability'
					? data.labels.visibilityManagerHint
					: '';

			return el( wp.components.SlotFillProvider, null, el( Dropdown, {
				open: isOpen,
				onToggle: setOpen,
				onClose: function () { setOpen( false ); },
				renderToggle: function ( controls ) {
					return el( Button, {
						ref: setAnchor,
						className: isAdminBar ? 'ab-item cs-share-trigger' : 'dcp-changeset-bar__trigger cs-share-trigger',
						onClick: controls.onToggle,
						'aria-haspopup': 'dialog',
						'aria-expanded': controls.isOpen,
						'aria-label': data.labels.shareTrigger + ': ' + data.title,
					}, badge() );
				},
				contentClassName: 'cs-changeset-share-popover',
				popoverProps: {
					anchor: anchor,
					inline: ! isAdminBar,
					noArrow: true,
					placement: 'bottom-start',
					// The front-end admin bar's portal positions from the toolbar origin.
					offset: isAdminBar
						? 2 * document.getElementById( 'wpadminbar' ).offsetHeight - ( anchor ? anchor.offsetHeight : 32 ) + 12
						: 12,
					shift: isAdminBar,
				},
				renderContent: function () {
					return el( 'div', { className: 'cs-share-content' },
						el( 'div', { className: 'cs-share-heading' },
							el( 'h3', null, data.labels.shareHeading ),
							el( 'span', { className: 'cs-share-status' }, data.labels[ status ] || status )
						),
						el( 'p', { className: 'cs-share-title' }, data.title ),
						el( Button, { variant: 'primary', size: 'compact', onClick: share }, data.labels.copyLink ),
						data.sharing
							? el( 'div', { className: 'cs-share-settings' },
								el( RadioControl, {
									label: data.labels.visibility,
									selected: draftVisibility,
									options: [
										{ label: visibilityLabels.public, value: 'public' },
										{ label: visibilityLabels.logged_in, value: 'logged_in' },
										{ label: visibilityLabels.capability, value: 'capability' },
									],
									disabled: isSaving,
									onChange: setDraftVisibility,
								} ),
								el( Button, {
									variant: 'secondary',
									size: 'compact',
									disabled: isSaving || draftVisibility === visibility,
									accessibleWhenDisabled: true,
									isBusy: isSaving,
									onClick: saveVisibility,
								}, isSaving ? data.labels.saving : data.labels.saveVisibility )
							)
							: el( 'p', { className: 'cs-share-audience' }, data.labels.visibility, ': ', visibilityLabels[ effectiveVisibility ] ),
						visibility !== effectiveVisibility
							? el( 'p', { className: 'cs-share-hint' }, data.labels.visibilityOverride )
							: audienceHint
								? el( 'p', { className: 'cs-share-hint' }, audienceHint )
								: null,
						message ? el( Notice, { status: 'success', isDismissible: false }, message ) : null,
						errorMessage ? el( Notice, { status: 'error', isDismissible: false },
							errorMessage,
							errorMessage === data.labels.copyError
								? el( 'code', { className: 'cs-share-fallback-url' }, data.shareUrl )
								: null
						) : null,
						( data.approval && status === 'open' ) || data.exitUrl
							? el( 'div', { className: 'cs-share-actions' },
								data.approval && status === 'open'
									? el( Button, {
										variant: 'secondary', size: 'compact', onClick: approve,
										isBusy: isApproving, disabled: isApproving,
									}, isApproving ? data.labels.approving : data.labels.approve )
									: null,
								data.exitUrl
									? el( Button, { variant: 'tertiary', size: 'compact', href: data.exitUrl }, data.labels.exit )
									: null
							)
							: null
					);
				},
			} ), slotMount ? wp.element.createPortal( el( wp.components.Popover.Slot ), slotMount ) : null );
		}

		wp.element.createRoot( mount ).render( el( App ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init, { once: true } );
	} else {
		init();
	}
} )();
