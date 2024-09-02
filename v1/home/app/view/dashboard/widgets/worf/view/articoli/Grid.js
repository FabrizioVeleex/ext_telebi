/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.view.articoli.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters'
    ],
    bind: {
        store: '{storeArticoli}'
    },
    closable:true,
    features: [{ftype: 'summary', dock: 'bottom'}],
    plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    viewConfig: {emptyText: Locale.t('global.grid.store.empty'), deferEmptyText: false},
    columns: []
})
