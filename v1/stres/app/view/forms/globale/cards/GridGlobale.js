/**
 * Created by luke on 27/09/21.
 */
Ext.define('stres.view.forms.globale.cards.GridGlobale', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeGlobale}",
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    features: [{ftype: 'summary', dock: 'top'}],
    columns: [
        {text: Locale.t("stres.grids.globale.columns.anno"), width: 200, dataIndex: "anno"},
        {text: Locale.t("stres.grids.globale.columns.venduto"), width: 200, dataIndex: "venduto",summaryType: 'sum',
            renderer: function (value) {
                return Ext.util.Format.number(value, '0,000')
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
            }
        },
        {text: Locale.t("stres.grids.globale.columns.reso"), width: 200, dataIndex: "reso",summaryType: 'sum',
            renderer: function (value) {
                return Ext.util.Format.number(value, '0,000')
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
            }
        },
        {text: Locale.t("stres.grids.globale.columns.perc"), width: 200, dataIndex: "perc",sortable:false,
            renderer: function (value) {
                let tmp=Number(value / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                return tmp.replace(',','.')
            }
        }
    ]
});