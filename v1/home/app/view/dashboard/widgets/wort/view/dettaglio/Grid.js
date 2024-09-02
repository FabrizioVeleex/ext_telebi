/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.dettaglio.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'v1-wort-gridDet',
    flex: 2,
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    multiSelect: false,
    features: [{ftype: 'summary', dock: 'bottom'}],
    viewConfig: {emptyText: Locale.t('global.grid.store.empty'), deferEmptyText: false}
    , columns: [
        {
            text: Locale.t('wort.dettaglio.columns.articolo'),
            width: Ext.global.Vars.infoUser.theme === 'big' ? 130 : 120,
            dataIndex: 'CDARR',
            draggable: false,
            summaryType: 'count',
            summaryRenderer: function (value) {
                return '<span style=\"font-weight:bold;\">' + value + '</span>'
            },
        },
        {
            text: Locale.t('wort.dettaglio.columns.descrizione'),
            minWidth: Ext.global.Vars.infoUser.theme === 'big' ? 220 : 200,
            flex: 1, dataIndex: 'DESC', draggable: false
        },
        {
            text: Locale.t('wort.dettaglio.columns.um'),
            width: Ext.global.Vars.infoUser.theme === 'big' ? 70 : 60,
            dataIndex: 'UNMSR',
            draggable: false
        }, {
            text: Locale.t('wort.dettaglio.columns.qta'),
            width: Ext.global.Vars.infoUser.theme === 'big' ? 90 : 80,
            dataIndex: 'QTORR',
            align: 'right',
            draggable: false
        },
        {
            text: Locale.t('wort.dettaglio.columns.prezzo'),
            width: Ext.global.Vars.infoUser.theme === 'big' ? 160 : 150,
            dataIndex: 'PRUNI',
            align: 'right',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            draggable: false
        },
        {
            text: Locale.t('wort.dettaglio.columns.totale'),
            width: Ext.global.Vars.infoUser.theme === 'big' ? 160 : 150,
            dataIndex: 'VLORR',
            align: 'right',
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            },
            draggable: false
        }
    ]
})
