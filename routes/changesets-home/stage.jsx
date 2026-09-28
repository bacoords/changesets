import apiFetch from '@wordpress/api-fetch';
import { Button, Notice, Spinner, TextControl } from '@wordpress/components';
import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Link, useNavigate } from '@wordpress/route';
import { Badge, Card } from '@wordpress/ui';
import './style.scss';

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

const fields = [
  {
    id: 'title',
    type: 'text',
    enableGlobalSearch: true,
    label: __( 'Title', 'changesets' ),
  },
  {
    id: 'status',
    type: 'text',
    label: __( 'Status', 'changesets' ),
    elements: Object.entries( statusLabels ).map( ( [ value, label ] ) => ( { value, label } ) ),
    render: ( { item } ) => <Badge intent={ statusIntents[ item.status ] || 'none' }>{ statusLabels[ item.status ] || item.status }</Badge>,
  },
  {
    id: 'modified',
    type: 'datetime',
    label: __( 'Modified', 'changesets' ),
  },
];

const initialView = {
  type: 'table',
  perPage: 10,
  page: 1,
  search: '',
  filters: [],
  sort: { field: 'modified', direction: 'desc' },
  titleField: 'title',
  fields: [ 'status', 'modified' ],
  layout: { density: 'balanced' },
};

export const stage = () => {
  const navigate = useNavigate();
  const [ items, setItems ] = useState( null );
  const [ view, setView ] = useState( initialView );
  const [ title, setTitle ] = useState( '' );
  const [ creating, setCreating ] = useState( false );
  const [ error, setError ] = useState( '' );

  useEffect( () => {
    apiFetch( { path: '/changesets/v1/workspace' } )
      .then( setItems )
      .catch( ( response ) => setError( response.message || __( 'Could not load changesets.', 'changesets' ) ) );
  }, [] );

  const dataset = useMemo(
    () => filterSortAndPaginate( items || [], view, fields ),
    [ items, view ]
  );

  const create = async ( event ) => {
    event.preventDefault();
    if ( ! title.trim() || creating ) {
      return;
    }
    setCreating( true );
    setError( '' );
    try {
      const item = await apiFetch( {
        path: '/changesets/v1/workspace',
        method: 'POST',
        data: { title: title.trim() },
      } );
      navigate( { to: `/review/${ item.id }` } );
    } catch ( response ) {
      setError( response.message || __( 'Could not create changeset.', 'changesets' ) );
      setCreating( false );
    }
  };

  return (
    <main className="cs-workspace">
      <header className="cs-workspace__header">
        <h1>{ __( 'Changesets', 'changesets' ) }</h1>
        <p>{ __( 'Review staged site changes before they go live.', 'changesets' ) }</p>
      </header>

      { error && <Notice status="error" isDismissible={ false }>{ error }</Notice> }

      <Card.Root className="cs-workspace__create" render={ <section aria-label={ __( 'Create a changeset', 'changesets' ) } /> }>
        <Card.Header><Card.Title>{ __( 'New changeset', 'changesets' ) }</Card.Title></Card.Header>
        <Card.Content>
          <form onSubmit={ create }>
            <TextControl
              label={ __( 'Title', 'changesets' ) }
              value={ title }
              onChange={ setTitle }
              placeholder={ __( 'What are you changing?', 'changesets' ) }
            />
            <Button variant="primary" type="submit" isBusy={ creating } disabled={ creating || ! title.trim() }>
              { __( 'Create changeset', 'changesets' ) }
            </Button>
          </form>
        </Card.Content>
      </Card.Root>

      <section aria-label={ __( 'All changesets', 'changesets' ) }>
        <h2>{ __( 'All changesets', 'changesets' ) }</h2>
        { ! items ? <div className="cs-workspace__loading"><Spinner /></div> : (
          <DataViews
            data={ dataset.data }
            fields={ fields }
            view={ view }
            onChangeView={ setView }
            paginationInfo={ dataset.paginationInfo }
            defaultLayouts={ { table: {} } }
            config={ { perPageSizes: [ 10, 20, 50, 100 ] } }
            searchLabel={ __( 'Search changesets', 'changesets' ) }
            isItemClickable={ () => true }
            renderItemLink={ ( { item, ...props } ) => <Link to={ `/review/${ item.id }` } { ...props } /> }
            empty={ <p>{ __( 'No changesets found.', 'changesets' ) }</p> }
          />
        ) }
      </section>
    </main>
  );
};
