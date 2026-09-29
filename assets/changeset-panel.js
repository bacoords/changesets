( function () {
	'use strict';

	function init() {
		var trigger = document.querySelector(
			'#wp-admin-bar-changesets-panel > .ab-item, .dcp-changeset-bar__trigger'
		);
		var data = window.csChangesetPanel;
		if ( ! trigger || ! data || ! window.wp || ! wp.element || ! wp.components ) {
			return;
		}

		var el = wp.element.createElement;
		var useState = wp.element.useState;
		var useEffect = wp.element.useEffect;
		var Button = wp.components.Button;
		var Modal = wp.components.Modal;
		var Panel = wp.components.Panel;
		var PanelBody = wp.components.PanelBody;
		var mount = document.createElement( 'div' );
		mount.id = 'cs-changeset-panel-root';
		document.body.appendChild( mount );

		trigger.setAttribute( 'aria-haspopup', 'dialog' );
		trigger.setAttribute( 'aria-expanded', 'false' );

		function section( title, items, renderItem, initialOpen, className ) {
			if ( ! items.length ) {
				return null;
			}
			return el(
				PanelBody,
				{
					className: className
						? 'cs-panel-section ' + className
						: 'cs-panel-section',
					key: title,
					initialOpen: initialOpen,
					scrollAfterOpen: false,
					title: el(
						'span',
						{ className: 'cs-panel-section__title' },
						title,
						el( 'span', { className: 'cs-panel-count' }, String( items.length ) )
					),
				},
				el(
					'ul',
					{ className: 'cs-panel-list' },
					items.map( renderItem )
				)
			);
		}

		function contentItem( item, index ) {
			var title = item.url
				? el(
						Button,
						{
							href: item.url,
							variant: 'link',
							className: 'cs-panel-content-link',
							'aria-label': item.title + ' — ' + data.labels.view,
						},
						item.title,
						el( 'span', { 'aria-hidden': 'true' }, ' ↗' )
				  )
				: el( 'span', { className: 'cs-panel-content-title' }, item.title );

			return el(
				'li',
				{ className: 'cs-panel-item', key: 'content-' + index },
				el(
					'span',
					{ className: 'cs-panel-item__meta' },
					item.change === 'new' ? data.labels.new : data.labels.update,
					' · ',
					item.type
				),
				title
			);
		}

		function styleItem( path, index ) {
			return el(
				'li',
				{ className: 'cs-panel-item', key: 'style-' + index },
				el( 'code', { className: 'cs-panel-style-path' }, path )
			);
		}

		function settingItem( item, index ) {
			return el(
				'li',
				{ className: 'cs-panel-item', key: 'setting-' + index },
				el( 'span', { className: 'cs-panel-setting-label' }, item.label ),
				item.value
					? el( 'span', { className: 'cs-panel-setting-value' }, item.value )
					: null
			);
		}

		function App() {
			var state = useState( false );
			var isOpen = state[ 0 ];
			var setOpen = state[ 1 ];
			var statusState = useState( data.status );
			var statusValue = statusState[ 0 ];
			var setStatus = statusState[ 1 ];
			var approvalState = useState( false );
			var approving = approvalState[ 0 ];
			var setApproving = approvalState[ 1 ];
			var errorState = useState( '' );
			var approvalError = errorState[ 0 ];
			var setApprovalError = errorState[ 1 ];

			useEffect( function () {
				function openPanel( event ) {
					event.preventDefault();
					trigger.setAttribute( 'aria-expanded', 'true' );
					setOpen( true );
				}
				trigger.addEventListener( 'click', openPanel );
				return function () {
					trigger.removeEventListener( 'click', openPanel );
				};
			}, [] );

			function closePanel() {
				setOpen( false );
				trigger.setAttribute( 'aria-expanded', 'false' );
				window.requestAnimationFrame( function () {
					trigger.focus();
				} );
			}

			function approveChangeset() {
				if ( ! data.approval || approving ) {
					return;
				}
				setApproving( true );
				setApprovalError( '' );
				var body = new window.URLSearchParams();
				body.set( 'action', 'cs_approve_changeset' );
				body.set( 'changeset_id', String( data.changesetId ) );
				body.set( 'nonce', data.approval.nonce );
				window
					.fetch( data.approval.url, {
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						},
						body: body.toString(),
					} )
					.then( function ( response ) {
						return response.json().then( function ( payload ) {
							if ( ! response.ok || ! payload.success ) {
								throw new Error(
									payload.data && payload.data.message
										? payload.data.message
										: data.labels.approveError
								);
							}
							return payload;
						} );
					} )
					.then( function () {
						setStatus( 'approved' );
						setApproving( false );
					} )
					.catch( function ( error ) {
						setApprovalError( error.message || data.labels.approveError );
						setApproving( false );
					} );
			}

			if ( ! isOpen ) {
				return null;
			}

			var changeCount =
				data.content.length + data.styles.length + data.settings.length;
			var status = data.labels[ statusValue ] || statusValue;
			var visibilityLabels = {
				public: data.labels.visibilityPublic,
				logged_in: data.labels.visibilityLoggedIn,
				capability: data.labels.visibilityCapability,
			};
			var visibility = visibilityLabels[ data.effectiveVisibility ];

			return el(
				Modal,
				{
					title: data.title,
					onRequestClose: closePanel,
					className: 'cs-changeset-panel-frame',
					overlayClassName: 'cs-changeset-panel-overlay',
					closeButtonLabel: data.labels.close,
				},
				el(
					'div',
					{
						className: 'cs-panel-scroll',
						role: 'region',
						'aria-label': data.labels.reviewChanges,
						tabIndex: 0,
					},
					el(
					'div',
					{ className: 'cs-panel-summary' },
					el(
						'div',
						{ className: 'cs-panel-summary__details' },
						el(
							'span',
							{ className: 'cs-panel-status', 'aria-live': 'polite' },
							data.labels.status,
							': ',
							status
						),
						el(
							'span',
							{ className: 'cs-panel-visibility' },
							data.labels.visibility,
							': ',
							visibility,
							data.visibility !== data.effectiveVisibility
								? ' (' + data.labels.visibilityOverride + ')'
								: null
						)
					),
					el(
						'span',
						{ className: 'cs-panel-total' },
						String( changeCount ),
						' ',
						changeCount === 1
							? data.labels.changeOne
							: data.labels.changeMany
					)
				),
				changeCount
					? el(
							Panel,
							{ className: 'cs-panel-group' },
							section( data.labels.content, data.content, contentItem, true ),
							section( data.labels.settings, data.settings, settingItem, true ),
							section(
								data.labels.styles,
								data.styles,
								styleItem,
								false,
								'cs-panel-section--styles'
							)
					  )
					: el( 'p', { className: 'cs-panel-empty' }, data.labels.empty )
				),
				data.exitUrl || ( data.approval && 'open' === statusValue )
					? el(
							'div',
							{ className: 'cs-panel-footer' },
							approvalError
								? el( 'p', { className: 'cs-panel-approval-error', role: 'alert' }, approvalError )
								: null,
							el(
								'div',
								{ className: 'cs-panel-actions' },
								data.approval && 'open' === statusValue
									? el(
											Button,
											{
												variant: 'primary',
												size: 'compact',
												accessibleWhenDisabled: true,
												disabled: approving,
												isBusy: approving,
												onClick: approveChangeset,
											},
											approving ? data.labels.approving : data.labels.approve
									  )
									: null,
								data.exitUrl
									? el(
											Button,
											{
												variant: 'secondary',
												size: 'compact',
												href: data.exitUrl,
											},
											data.labels.exit
									  )
									: null
							)
					  )
					: null
			);
		}

		wp.element.createRoot( mount ).render( el( App ) );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init, { once: true } );
	} else {
		init();
	}
} )();
