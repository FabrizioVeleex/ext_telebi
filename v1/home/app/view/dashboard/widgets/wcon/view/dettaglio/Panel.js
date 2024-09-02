/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.dettaglio.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Display',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.util.Format',
        'home.view.dashboard.widgets.wcon.view.dettaglio.Controller',
        'home.view.dashboard.widgets.wcon.view.dettaglio.Griddettaglio',
        'home.view.dashboard.widgets.wcon.view.dettaglio.Model'
    ],
    ui:'wcon',
    border:true,
    viewModel:'v1-wcondettaglio',
    controller:'v1-wcondettaglio',
    layout: {
        type: "vbox", align: "stretch"
    },
    header: {
        itemPosition: 1,
        items: [
            {xtype:'button', margin :'10 10 10 10', iconCls: 'icon-pdf', handler: 'onStampaPdf'},
            {xtype:'button', margin :'10 10 10 10', iconCls: 'icon-xls', handler: 'onEsportaXls'},
            {xtype:'button', margin :'10 10 10 10', iconCls: 'x-fas fa-window-close', handler: 'onClosePannello'}
        ]
    },
    items: [
        {xtype:'container', height: 90,
            layout: {type: "hbox", align: "stretch"},
            items:[
                {
                    xtype:'panel',
                    padding: '0 0 5 5',
                    defaults:{
                        labelCls:'bd-label-default',
                        cls:'bd-field-wcon',
                        padding:2
                    },
                    flex:1,
                    items:[
                        {xtype:'displayfield',fieldLabel:Locale.t('wcon.dettaglio.dfdata'),bind:{value:'{record.dataagg}'}},
                        {xtype:'displayfield',fieldLabel:Locale.t('wcon.dettaglio.pagamento'),bind:{value:'{record.pagamento}'}}
                    ]
                },
                {
                    xtype:'panel',
                    padding: '0 5 5 5',
                    bodyCls:'bd-wcon-orange',
                    defaults:{
                        labelCls:'bd-label-default',
                        cls:'bd-field-wcon',
                        padding:2,
                        fieldCls:'bd-field-right'
                    },
                    flex:1,
                    items:[
                        {xtype:'displayfield',fieldLabel:Locale.t('wcon.dettaglio.scaduto'),width:250,bind:{value:'{record.totsca}'},
                            renderer:function(value){
                                let style= 'color:red;';
                                return '<span style="font-weight:bold;'+style+'">'+Ext.util.Format.currency(value, '€ ', 2)+'</span>';
                            }
                        },
                        {xtype:'displayfield',fieldLabel:Locale.t('wcon.dettaglio.fido'),width:250,bind:{value:'{record.fido}',hidden: '{hideFido}'},
                            renderer:function(value){
                                let style= 'color:red;';
                                return '<span style="font-weight:bold;'+style+'">'+Ext.util.Format.currency(value, '€ ', 2)+'</span>';
                            }
                        },
                        {xtype:'displayfield',fieldLabel:Locale.t('wcon.dettaglio.esposizione'),width:250,bind:{value:'{record.totesp}'},
                            renderer:function(value){
                                let style= 'color:red;';
                                return '<span style="font-weight:bold;'+style+'">'+Ext.util.Format.currency(value, '€ ', 2)+'</span>';
                            }
                        }
                    ]
                }
            ]
        },
        {xtype:'container', flex:1,
            layout: {type: "hbox", align: "stretch"},
            items:[
                {xtype:'v1-wcongridDet', flex:1}
            ]
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});