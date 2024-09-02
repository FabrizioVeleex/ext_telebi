Ext.define('home.view.imp.cards.Images', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.HBox',
        'home.view.imp.cards.ViewImages'
    ],
    width:500,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        layout: {
            pack: 'center'
        },
        style: {'background-color': 'transparent'},
        items: [
            {
                scale: 'large', text: Locale.t('home.impostazioni.profilo'),
                cls: 'bd-btn-radius', iconCls: 'x-fas fa-user fa-size-32',
                ui: 'ocra',
                handler: 'goToInfo'
            }
        ]
    }],
    items: [
        {
            flex: 1,
            layout: {
                type: "hbox",
                align: 'center'
            },
            xtype:'component',
            autoEl:{
                tag:'div',
                html:'<div style="background-position: center;" class="defaultLogo"></div><hr>'
            }
        },
        {
            title: Locale.t('home.impostazioni.savetext'),
            style: 'background:transparent url(/images/white.png) repeat 0 50%;',
            xtype: 'viewimp', padding: 50, flex: 1
        }
    ]
});