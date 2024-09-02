/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'home.view.dashboard.widgets.word.view.residuo.Controller',
        'home.view.dashboard.widgets.word.view.residuo.Grid',
        'home.view.dashboard.widgets.word.view.residuo.Gridfam',
        'home.view.dashboard.widgets.word.view.residuo.Model',
        'home.view.dashboard.widgets.word.view.residuo.Raggruppamento'
    ],
    ui:'word',
    border:true,
    viewModel:'v1-wordresiduo',
    controller:'v1-wordresiduo',
    layout: {
        type: "vbox", align: "stretch"
    },
    dockedItems: [
        {
            xtype:'toolbar',
            reference:'toolbarTop',
            dock: 'top',
            items: [
                {xtype: 'v1-wordraggruppamento'},
                {xtype: 'button', ui:'blue',iconCls: 'x-fas fa-file-excel',text: '',handler: 'onExcel'}
            ]
        }
    ],

    header: {
        itemPosition: 1,
        items: [{
            xtype:'button',
            tooltips: Locale.t('global.btn.close.text'),
            iconCls: 'x-fas fa-window-close',
            handler: 'onClosePannello'
        }]
    },
    items: [
        {xtype:'container', height: 40,
            layout: {type: "hbox", align: "stretch"},
            items:[
                {xtype:'v1-wordraggruppamento'}
            ]
        },
        {xtype:'container', flex:1,
            layout: {type: "hbox", align: "stretch"},
            items:[
                {xtype:'v1-word-res-gridcli', flex:1}
            ],
            bind:{
                hidden:'{hideCli}'
            }
        },
        {xtype:'container', flex:1,
            layout: {type: "hbox", align: "stretch"},
            items:[
                {xtype:'v1-wordResfam', flex:1}
            ],
            bind:{
                hidden:'{hideFam}'
            }
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});