/**
 * Created by luke on 27/09/21.
 */
Ext.define('stver.view.forms.anno.cards.GridAnno', {
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
    features: [{ftype: 'summary', dock: 'top'}],
    columns: [
        {text: Locale.t("stver.grids.anno.columns.codart"), width: 100, dataIndex: "codart"},
        {text: Locale.t("stver.grids.anno.columns.descrizione"), flex:1, minWidth:120,dataIndex: "descrizione"},
        {text: Locale.t("stver.grids.anno.columns.pianif"), width: 120, dataIndex: "pianificatore"},
        {text: Locale.t("stver.grids.anno.columns.mesi.1"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta1",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
        },
        {text: Locale.t("stver.grids.anno.columns.mesi.2"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta2",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.3"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta3",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.4"), width:Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta4",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.5"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta5",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.6"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta6",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.7"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta7",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.8"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta8",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.9"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta9",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.10"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta10",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.11"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta11",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.mesi.12"), width: Ext.global.Vars.infoUser.theme==='default'?80:100, dataIndex: "qta12",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: Locale.t("stver.grids.anno.columns.tot"), width: Ext.global.Vars.infoUser.theme==='default'?100:120, dataIndex: "tot",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }}
    ]
});