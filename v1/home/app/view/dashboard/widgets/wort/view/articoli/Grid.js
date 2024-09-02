/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.articoli.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.util.Format'
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
    viewConfig: {emptyText: Locale.t('global.grid.store.empty'), deferEmptyText: false}
    , columns: [
        {
            text: Locale.t('wort.articoli.columns.articolo'),
            width: 120,
            dataIndex: 'CDARR',summaryType: 'count',
            draggable: false,filter: {type: 'string'},
            summaryRenderer: function (value) {
                return '<span style=\"font-weight:bold;float:right\">' + value + '</span>'
            }
        },
        {
            text: Locale.t('wort.articoli.columns.descrizione'),
            flex: 1, dataIndex: 'DESC', draggable: false,filter: {type: 'string'}
        },
        {
            text: Locale.t('wort.articoli.columns.um'),
            width: 60,
            dataIndex: 'UNMSR',filter: {type: 'string'},
            draggable: false
        }, {
            text: Locale.t('wort.articoli.columns.qta'),
            width: 150,
            dataIndex: 'QTORR', align: 'right', draggable: false, summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value,'0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            },
            filter: {type: 'numeric'}
        },
        {
            text: Locale.t('wort.articoli.columns.importo'),
            width: 200,
            dataIndex: 'VLORR', align: 'right', draggable: false, summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            },
            filter: {type: 'numeric'}
        }
    ]
})
