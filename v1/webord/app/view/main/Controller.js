/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('webord.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'webord.view.grids.notifiche.Grid',
        'webord.view.grids.ordini.annullati.Grid',
        'webord.view.grids.ordini.bloccati.Grid',
        'webord.view.grids.ordini.nuovi.Grid',
        'webord.view.grids.ordini.trasmessi.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "bloccati": Ext.create('webord.view.grids.ordini.bloccati.Grid',{itemId:'bloccati',setCfgPer: true}),
            "trasmessi": Ext.create('webord.view.grids.ordini.trasmessi.Grid',{itemId:'trasmessi',setCfgPer: true}),
            "nuovi": Ext.create('webord.view.grids.ordini.nuovi.Grid',{itemId:'nuovi',setCfgPer: true}),
            "annullati": Ext.create('webord.view.grids.ordini.annullati.Grid',{itemId:'annullati',setCfgPer: true}),
            "notifiche": Ext.create('webord.view.grids.notifiche.Grid',{itemId:'notifiche',setCfgPer: false})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica o altra app
        if (r.tabella && r.idrecord) {

        }
    },
    onInfoUserApp:function (record) {

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
        tab.fireEvent('checkColumn',tab)
    }
});
