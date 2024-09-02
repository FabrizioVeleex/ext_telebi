/**
 * Created by luca on 26/08/16.
 */
Ext.define('skd.view.main.West', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.layout.container.VBox',
        'Ext.button.Button',
        'Ext.panel.Panel'
    ],
    collapsible: false,
    resizable: true,
    userCls:'main-west',
    floatable: false,
    width: 250,
    minSize: 100,
    maxSize: 300,
    split: {
        size: 6,
        userCls:'goma-grid-split'
    },
    layout: {
        type: "vbox",
        align:'stretch'
    },
    items:[
        {
            xtype:'component',
            height:130,
            bind:{
                html:'{appTitle}'
            }
        },
        {
            xtype:'toolbar',
            dock: 'bottom',
            items:[
                {
                    iconCls:'fas fa-caret-square-left bd-color-green',
                    text:Locale.t('global.menu.hide'),
                    action:true,
                    handler:'onToggleNav'
                },
                {
                    iconCls:'fas fa-window-close bd-color-red',
                    text:Locale.t('global.btn.closeapp.text'),
                    handler:'onCloseApp'
                },
                {
                    xtype:'button',
                    iconCls:'fas fa-download ',
                    hidden:true,
                    bind:{
                      hidden:'{hiddenPdf}'
                    },
                    handler:'onOpenPdf'
                },
                {
                    xtype:'button',
                    iconCls:'fas fa-info bd-color-blue',
                    hidden:true,
                    tooltip:'Fabbisogno fornitura',
                    bind:{
                        hidden:'{hiddenInfo}'
                    },
                    handler:'onOpenInfo'
                }
            ]
        }
    ]
});
