/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define('websrv.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',
    requires:[
        'websrv.view.grids.assoricambi.Grid',
        'websrv.view.grids.webprodotti.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function () {
        this.panels ={
            "assoricambi": Ext.create('websrv.view.grids.assoricambi.Grid',{itemId:'assoricambi',setCfgPer: true}),
            "webprodotti": Ext.create('websrv.view.grids.webprodotti.Grid',{itemId:'webprodotti',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu', {});
        this.callParent(arguments);
    },
    onRunApertura:function(r){
        //apertura da notifica
    },
    onInfoUserApp:function (record) {
        // SpcUser = Ext.decode(record.responseText);
    },
    onBeforeLoadMenuNode: function(store, operation){
        if (!operation.node.get("root")){

        }
    },
    onLoadStoreGrid:function (s) {

    }
});

