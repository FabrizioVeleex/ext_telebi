Ext.define('portal.v1.view.forms.FormWaiting', {
    extend: 'Ext.Container',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'portal.util.Locale'
    ],
    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },
    items: [{
        xtype: 'panel',
        minWidth: 400,
        bodyPadding: 10,
        items: [
            {
                xtype:'component',

                bind:{
                  hidden:'{!panelinfo.iconInfoStart}'
                },
                style:{
                    'text-align':'center'
                },
                html:'<div class="fas fa-spinner fa-pulse fa-3x fa-fw"></div>'
            },
            {
                xtype:'component',
                hidden:true,
                bind:{
                    hidden:'{!panelinfo.iconInfoError}'
                },
                style:{
                    'text-align':'center'
                },
                html:'<div class="x-fas fa-exclamation-triangle fa-3x"></div>'
            },
            {
                xtype: 'component',
                anchor: '100%',
                style: 'font-weight: bold;',
                bind: {
                    html: '<div style="text-align: center">{panelinfo.consoleInfo}</div>'
                }
            }
        ],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },

            style:{
                'background-color':'transparent'
            },
            items: [{
                hidden:true,
                ui: 'ocra',
                iconCls: 'x-fas fa-times-circle',
                bind:{
                    hidden:'{!panelinfo.btnInfoErrorLoad}'
                },
                text: Locale.t('global.btn.close.text'),
                handler: 'onClose'
            },{
                hidden:true,
                ui:'green',
                iconCls:'fas fa-edit',
                bind:{
                    hidden:'{!panelinfo.btnInfoErrorSave}'
                },
                text: Locale.t('global.btn.errorsave.text'),
                handler: 'onErrorSave'
            }]
        }]
    }
    ],
    listeners: {
        afterRender: 'loadData'
    }
})
