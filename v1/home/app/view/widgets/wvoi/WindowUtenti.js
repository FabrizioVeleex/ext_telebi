/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.view.widgets.wvoi.WindowUtenti', {
    extend: 'Ext.Window',
    requires:[
        'home.view.widgets.wvoi.GridUtenti',
        'home.view.widgets.wvoi.GridUtentiController',
        'home.store.widgets.wvoi.GridUtenti',
        'Ext.button.Button'
    ],
    controller:'wvoigridutenti',
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
        let store = Ext.create('home.store.widgets.wvoi.GridUtenti');
        this.items= [{
            xtype:'wvoi-gridUtenti',
            width: 850,
            height: 370,
            reference: 'gridwvoiutenti',
            store:store
        }];
        this.callParent(arguments);

    }
});