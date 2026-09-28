import apiFetch from '@wordpress/api-fetch';
import { Button, Notice, Spinner } from '@wordpress/components';
import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Link, useParams } from '@wordpress/route';
import { Badge, Card } from '@wordpress/ui';
import '../changesets-home/style.scss';

const statusLabels = {
  open: __( 'Open', 'changesets' ),
  approved: __( 'Approved', 'changesets' ),
  published: __( 'Published', 'changesets' ),
  discarded: __( 'Discarded', 'changesets' ),
};

const statusIntents = {
  open: 'informational',
  approved: 'medium',
  published: 'stable',
  discarded: 'none',
};

const contentFields = [
  { id: 'title', type: 'text', enableGlobalSearch: true, label: __( 'Title', 'changesets' ) },
  { id: 'post_type', type: 'text', enableGlobalSearch: true, label: __( 'Type', 'changesets' ) },
  {
    id: 'change',
    type: 'text',
    label: __( 'Change', 'changesets' ),
    elements: [
      { value: 'new', label: __( 'New', 'changesets' ) },
      { value: 'update', label: __( 'Update', 'changesets' ) },
    ],
  },
];

const initialContentView = {
  type: 'table',
  perPage: 10,
  page: 1,
  search: '',
  filters: [],
  titleField: 'title',
  fields: [ 'post_type', 'change' ],
  layout: { density: 'balanced' },
};

export const stage = () => {
  const { id } = useParams( { from: '/review/$id' } );
  const [ item, setItem ] = useState( null );
  const [ view, setView ] = useState( initialContentView );
  const [ error, setError ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ busy, setBusy ] = useState( false );
  const [ failures, setFailures ] = useState( [] );

  useEffect( () => {
    apiFetch( { path: `/changesets/v1/workspace/${ id }` } )
      .then( setItem )
      .catch( ( response ) => setError( response.message || __( 'Could not load changeset.', 'changesets' ) ) );
  }, [ id ] );

  const content = useMemo(
    () => filterSortAndPaginate( item?.content || [], view, contentFields ),
    [ item, view ]
  );

  const runAction = async ( operation ) => {
    if ( operation === 'publish' && ! window.confirm( __( 'Publish this changeset to the live site?', 'changesets' ) ) ) {
      return;
    }
    setBusy( true );
    setError( '' );
    setMessage( '' );
    setFailures( [] );
    try {
      const response = await apiFetch( {
        path: `/changesets/v1/workspace/${ id }/${ operation }`,
        method: 'POST',
      } );
      setItem( response.changeset );
      if ( response.result?.partial_success ) {
        setError( __( 'Some content could not be published. Resolve the failures, then retry.', 'changesets' ) );
        setFailures( response.result.failed_items || [] );
      } else {
        setMessage( operation === 'approve' ? __( 'Changeset approved.', 'changesets' ) : __( 'Changeset published.', 'changesets' ) );
      }
    } catch ( response ) {
      setError( response.message || __( 'Could not update changeset.', 'changesets' ) );
    } finally {
      setBusy( false );
    }
  };

  return (
    <main className="cs-workspace">
      <Link className="cs-workspace__back" to="/">← { __( 'All changesets', 'changesets' ) }</Link>
      { error && <Notice status="error" isDismissible={ false }>{ error }{ failures.length > 0 && <ul>{ failures.map( ( failure ) => <li key={ failure.staged_id }>{ `${ failure.staged_id }: ${ failure.reason }` }</li> ) }</ul> }</Notice> }
      { message && <Notice status="success" isDismissible={ false }>{ message }</Notice> }
      { ! item ? ( error ? null : <Spinner /> ) : (
        <>
          <header className="cs-workspace__header">
            <h1>{ item.title || __( 'Untitled changeset', 'changesets' ) }</h1>
          </header>
          <div className="cs-workspace__review-layout">
            <Card.Root className="cs-workspace__panel" render={ <section aria-label={ __( 'Staged changes', 'changesets' ) } /> }>
              <Card.Header><Card.Title>{ __( 'Staged changes', 'changesets' ) }</Card.Title></Card.Header>
              <Card.Content>
                <DataViews
                  data={ content.data }
                  fields={ contentFields }
                  view={ view }
                  onChangeView={ setView }
                  paginationInfo={ content.paginationInfo }
                  defaultLayouts={ { table: {} } }
                  searchLabel={ __( 'Search staged content', 'changesets' ) }
                  empty={ <p>{ __( 'No staged content.', 'changesets' ) }</p> }
                />
                { item.settings.length > 0 && <><h3>{ __( 'Settings', 'changesets' ) }</h3><p>{ item.settings.join( ', ' ) }</p></> }
                { item.styles && <><h3>{ __( 'Global styles', 'changesets' ) }</h3><p>{ __( 'This changeset includes a style update.', 'changesets' ) }</p></> }
              </Card.Content>
            </Card.Root>
            <Card.Root className="cs-workspace__panel" render={ <aside aria-label={ __( 'Review actions', 'changesets' ) } /> }>
              <Card.Header><Card.Title>{ __( 'Review', 'changesets' ) }</Card.Title></Card.Header>
              <Card.Content>
                <p><Badge intent={ statusIntents[ item.status ] || 'none' }>{ statusLabels[ item.status ] || item.status }</Badge></p>
                <div className="cs-workspace__actions">
                  { item.preview_url && <Button variant="secondary" href={ item.preview_url } target="_blank" rel="noopener noreferrer">{ __( 'Preview changeset', 'changesets' ) }</Button> }
                  { item.can_approve && <Button variant="primary" isBusy={ busy } disabled={ busy } onClick={ () => runAction( 'approve' ) }>{ __( 'Approve changeset', 'changesets' ) }</Button> }
                  { item.can_publish && <Button variant="primary" isBusy={ busy } disabled={ busy } onClick={ () => runAction( 'publish' ) }>{ __( 'Publish changeset', 'changesets' ) }</Button> }
                </div>
                { item.can_publish && <p>{ __( 'Publishing applies staged changes to the live site.', 'changesets' ) }</p> }
              </Card.Content>
            </Card.Root>
          </div>
        </>
      ) }
    </main>
  );
};
