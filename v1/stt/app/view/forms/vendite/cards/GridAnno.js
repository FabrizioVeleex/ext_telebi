/**
 * Created by luke on 27/09/21.
 */
Ext.define('stt.view.forms.vendite.cards.GridAnno', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeAnno}",
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    features: [{ftype: 'summary', dock: 'top'}],
    columns: [
        {text: Locale.t("stt.grids.vendite.columns.nazione"), width: 100, dataIndex: "nazione"},
        {text: Locale.t("stt.grids.vendite.columns.catve"), width: 100, dataIndex: "catve",sortable:false},
        {text: Locale.t("stt.grids.vendite.columns.cdcli"), width: 100, dataIndex: "cdcli"},
        {text: Locale.t("stt.grids.vendite.columns.ragsoc"), flex:1, dataIndex: "ragsoc"},
        {text: '', width: 150, dataIndex: "ultanno",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
        },
        {text: '', width: 150, dataIndex: "precanno",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stt.grids.vendite.columns.diff"), width: 150, dataIndex: "diff",align: 'right',summaryType: 'sum',
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
        {text: Locale.t("stt.grids.vendite.columns.perc"), width:80, dataIndex: "perc",align: 'right',sortable:false},
        {text: Locale.t("stt.grids.vendite.columns.oldanno"), width: 150, dataIndex: "oldanno",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
    ],
    listeners:{
        afterrender:'onafterrendergrid'
    }
});