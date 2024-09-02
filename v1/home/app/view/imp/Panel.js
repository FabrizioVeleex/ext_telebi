Ext.define('home.view.imp.Panel', {
    extend: 'Ext.panel.Panel',
    header: {
        height:42,
        titleAlign: 'center',
        baseCls: 'bd-header-panel-center',
        title: Locale.t('home.impostazioni.title')
    },
    requires:[
        'home.view.imp.Controller',
        'home.view.imp.Model',
        'Ext.layout.container.Card',
        'Ext.panel.Panel'
    ],
    layout:'card',
    controller: 'impostazioni',
    viewModel: 'impostazioni',
    bodyStyle:{
        'background-color':'transparent'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        layout:{
            pack: 'center'
        },
        style:{
            'background-color':'transparent'
        },
        items: [
            {
                scale:'large',
                text: Locale.t('home.impostazioni.btn.close.text'),
                cls:'bd-btn-radius',
                iconCls: 'x-fas fa-times-circle fa-size-32',
                ui:'ocra',
                tooltip: {
                    text: Locale.t('home.impostazioni.btn.close.tooltip'),
                    mouseOffset: [0, -60]
                },
                handler:'onCloseImpostazioni'
            }
        ]
    }],
    listeners:{
        clearAll:'clearAll'
    }
});