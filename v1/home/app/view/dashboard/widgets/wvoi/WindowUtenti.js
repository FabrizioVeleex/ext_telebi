/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.WindowUtenti', {
    extend: 'Ext.Window',
    requires:[
        'home.view.dashboard.widgets.wvoi.GridUtenti',
        'home.view.dashboard.widgets.wvoi.GridUtentiController',
        'home.view.dashboard.widgets.wvoi.store.GridUtenti',
        'Ext.button.Button'
    ],
    controller:'v1-wvoigridutenti',
    modal:true,
    padding:10,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {xtype: 'button' ,
                ui:'ocra',
                iconCls:'fas fa-times',
                text: Locale.t('widgetwcon.gridconfig.btn.close'),
                handler: 'onCloseUtenti'},
            {
                text: Locale.t('widgetwcon.gridconfig.btn.save'),
                iconCls: 'fas fa-pencil',
                ui: 'green',
                handler: 'onSaveUtenti'
            }
        ]
    }],
    items:[
    ],
    initComponent:function(){
        let store = Ext.create('home.view.dashboard.widgets.wvoi.store.GridUtenti');
        this.items= [{
            xtype:'v1-wvoi-gridUtenti',
            width: 850,
            height: 370,
            reference: 'gridwvoiutenti',
            store:store
        }];
        this.callParent(arguments);

    }
});
