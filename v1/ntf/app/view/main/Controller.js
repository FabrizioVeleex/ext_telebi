/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define('ntf.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',
    requires:[
        'ntf.view.grids.avvisi.Grid',
        'ntf.view.grids.notifiche.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onitemclick : function (pnl,node) {
        this.callParent(arguments);
        let tab = this.panelCenter.child('#'+node.data.itemId);
        tab.fireEvent('checkColumn',tab);
        let storeavvisi;
        //In base al nodo recupero store avvisi o notifiche
        if (node.data.itemId==='avvisi') {
            storeavvisi=this.panels.avvisi.getStore();
        } else {
            storeavvisi=this.panels.notifiche.getStore();
        }
        if (storeavvisi) { //la prima volta non devo caricare nulla
            if (!storeavvisi.isEmptyStore) {
                storeavvisi.proxy.extraParams.stato = node.data['stato'];
                storeavvisi.proxy.extraParams.tagapp = node.data['tagapp'];
                storeavvisi.load();
            }
        }
    },
    onAfterRender: function () {
        this.panels ={
            "avvisi": Ext.create('ntf.view.grids.avvisi.Grid',{itemId:'avvisi',setCfgPer: true}),
            "notifiche": Ext.create('ntf.view.grids.notifiche.Grid',{itemId:'notifiche',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu', {});
        this.callParent(arguments);
    },
    onRunApertura:function(r){
        //apertura da notifica
    },
    onInfoUserApp:function (record) {
        // SpcUser = Ext.decode(record.responseText);
        // this.infoUserApp = Ext.decode(record.responseText);
    },
    onBeforeLoadMenuNode: function(store, operation){
        if (!operation.node.get("root")){

        }
    },
    onLoadStoreGrid:function (s) {

    }
});

