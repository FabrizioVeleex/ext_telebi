/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
let SpcUser = [];
Ext.define('cde.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',

    requires:[
        'cde.view.grids.listbase.Grid',
        'cde.view.grids.listnetto.Grid',
        'cde.view.grids.listsconto.Grid',
        'cde.view.grids.notifiche.Grid',
        'cde.view.grids.webprodotti.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "listbase": Ext.create('cde.view.grids.listbase.Grid',{itemId:'listbase',setCfgPer: true}),
            "listnetto": Ext.create('cde.view.grids.listnetto.Grid',{itemId:'listnetto',setCfgPer: true}),
            "listsconto": Ext.create('cde.view.grids.listsconto.Grid',{itemId:'listsconto',setCfgPer: true}),
            "webprodotti": Ext.create('cde.view.grids.webprodotti.Grid',{itemId:'webprodotti',setCfgPer: true}),
            "notifiche": Ext.create('cde.view.grids.notifiche.Grid',{itemId:'notifiche',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu', {});
        this.callParent(arguments);
    },
    onRunApertura:function(r){
        //apertura da notifica
    },
    onInfoUserApp:function (record) {
        // this.infoUserApp = Ext.decode(record.responseText);
    },
    onBeforeLoadMenuNode: function(store, operation){
        if (!operation.node.get("root")){

        }
    },
    onLoadStoreGrid:function (s) {

    },
    onitemclick : function (pnl,node) {
        this.callParent(arguments);
        let tab = this.panelCenter.child('#'+node.data.itemId);
        tab.fireEvent('checkColumn',tab);
        if (node.data.idpadre) {
            let store
            if (node.data.itemId==='listbase') {
                store = this.panels.listbase.getStore()
            }
            if (node.data.itemId==='listnetto') {
                store = this.panels.listnetto.getStore()
            }
            if (node.data.itemId==='listsconto') {
                store = this.panels.listsconto.getStore()
            }
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
});
