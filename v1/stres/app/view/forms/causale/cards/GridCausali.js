/**
 * Created by luke on 27/09/21.
 */
Ext.define('stres.view.forms.causale.cards.GridCausali', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Template',
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeCausali}",
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    features: [{ftype: 'summary', dock: 'top'}],
    columns: [
        {text: Locale.t("stres.grids.causale.columns.cdcaus"), width: 100, dataIndex: "cdcaus"},
        {text: Locale.t("stres.grids.causale.columns.causale"), flex:1,minWidth:150, dataIndex: "causale"},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "reso1",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{reso1}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perc1",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc1}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"{anno1}"
            }},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "reso2",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{reso2}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perc2",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc2}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"{anno2}"
            }},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "reso3",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{reso3}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perc3",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc3}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"{anno3}"
            }},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "reso4",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{reso4}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perc4",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc4}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"{anno4}"
            }},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "reso5",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{reso5}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perc5",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc5}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"{anno5}"
            }},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "reso6",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{reso6}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perc6",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perc6}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"{anno6}"
            }},
        {columns:[
                {text: Locale.t('stres.grids.causale.columns.reso'),dataIndex: "totreso",width:Ext.global.Vars.infoUser.theme==='default'?60:80,xtype: 'templatecolumn', tpl: '{totreso}',summaryType: 'sum',resizable:true,draggable:false,align:'right',
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000')
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                },
                {text: Locale.t('stres.grids.causale.columns.perc'),dataIndex: "perctot",width:Ext.global.Vars.infoUser.theme==='default'?50:70,xtype: 'templatecolumn', tpl: '{perctot}',resizable:true,draggable:false,sortable:false,align:'right',
                    renderer: function (v) {
                        let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
                        return tmp.replace(',','.')
                    }
                }
            ],
            bind:{
                text:"Totale"
            }}
    ]
});