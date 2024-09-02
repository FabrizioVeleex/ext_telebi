/**
 * Created by luke on 27/09/21.
 */
Ext.define('stcom.view.forms.vendite.cards.GridVendite', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeVendite}",
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    features: [{ftype: 'summary', dock: 'top'}],
    columns: [
        {text: Locale.t("stcom.grids.vendite.columns.capoarea"), width: 100, dataIndex: "capoarea"},
        {text: Locale.t("stcom.grids.vendite.columns.cdcli"), width: 100, dataIndex: "cdcli"},
        {text: Locale.t("stcom.grids.vendite.columns.ragsoc"), flex:1, dataIndex: "ragsoc"},
        {text: Locale.t("stcom.grids.vendite.columns.cdazienda"), width: 80, dataIndex: "cdazienda",sortable:false},
        {text: Locale.t("stcom.grids.vendite.columns.nazione"), width: 100, dataIndex: "nazione"},
        {text: Locale.t("stcom.grids.vendite.columns.tipocli"), width: 100, dataIndex: "tipocli"},
        {text: '', width: 150, dataIndex: "fattincorso",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
        },
        {text: Locale.t("stcom.grids.vendite.columns.budget"), width: 150, dataIndex: "budget",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                if (v<0) {
                    return '<span style=\"color:red;\">' + Ext.util.Format.currency(v, '€ ', 2) + '</span>'
                } else {
                    return Ext.util.Format.currency(v, '€ ', 2);
                }
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stcom.grids.vendite.columns.perc"), width:80, dataIndex: "perc",align: 'right',sortable:false,
            renderer: function (v) {
                let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0})
                return tmp.replace(',','.')
            }
        },
        {text: '', width: 150, dataIndex: "fattprec",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stcom.grids.vendite.columns.percfatt"), width:80, dataIndex: "percfatt",align: 'right',sortable:false,
            renderer: function (v) {
                let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0})
                return tmp.replace(',','.')
            }
        },
        {text: '', width: 150, dataIndex: "fattold",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }}
    ],
    listeners:{
      //  afterrender:'onafterrendergrid'
    }
});