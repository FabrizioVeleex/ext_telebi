/**
 * Created by luke on 27/09/21.
 */
Ext.define('sting.view.forms.ingresso.cards.GridIngressi', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Template',
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeIngressi}",
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    features: [{ftype: 'summary', dock: 'top'}],
    columns: [
        {text: Locale.t("sting.grids.ingressi.columns.cdart"), width: 100, dataIndex: "cdart"},
        {text: Locale.t("sting.grids.ingressi.columns.descart"), width: 200, dataIndex: "descart"},
        {columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov1",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov1}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako1",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako1}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc1",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc1}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
        bind:{
            text:"{mese1}"
        }},
        {columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov2",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov2}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako2",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako2}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc2",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc2}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese2}"
            }
        },
        {columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov3",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov3}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako3",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako3}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc3",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc3}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],  bind:{
                text:"{mese3}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov4",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov4}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako4",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako4}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc4",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc4}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese4}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov5",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov5}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }},
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako5",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako5}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }},
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc5",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc5}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese5}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov6",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov6}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako6",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako6}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc6",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc6}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese6}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov7",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov7}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako7",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako7}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc7",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc7}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese7}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov8",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov8}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako8",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako8}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc8",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc8}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese8}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov9",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov9}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako9",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako9}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc9",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc9}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese9}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov10",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov10}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako10",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako10}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc10",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc10}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese10}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov11",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov11}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako11",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako11}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc11",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc11}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese11}"
            }
        },
        {text: '',columns:[
            {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "qtamov12",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtamov12}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "qtako12",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{qtako12}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value, '0,000');
                    return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                }
            },
            {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "perc12",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc12}',resizable:true,draggable:false,sortable:false,align:'right',
                renderer: function (v) {
                    let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                    return tmp.replace(',','.')
                }
            }
        ],
            bind:{
                text:"{mese12}"
            }
        },
        {text: Locale.t('sting.grids.ingressi.columns.totali'),columns:[
                {text: Locale.t('sting.grids.ingressi.columns.qtamov'),dataIndex: "totmov",width:Ext.global.Vars.infoUser.theme==='default'?90:110,xtype: 'templatecolumn', tpl: '{totmov}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                    }
                },
                {text: Locale.t('sting.grids.ingressi.columns.qtako'),dataIndex: "totko",width:Ext.global.Vars.infoUser.theme==='default'?90:110,xtype: 'templatecolumn', tpl: '{totko}',summaryType: 'sum',resizable:true,draggable:false,sortable:false,align:'right',
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
                    }
                },
                {text: Locale.t('sting.grids.ingressi.columns.perc'),dataIndex: "totperc",width:Ext.global.Vars.infoUser.theme==='default'?70:90,xtype: 'templatecolumn', tpl: '{totperc}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ]
        },
    ]
});