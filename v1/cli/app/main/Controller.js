/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('cli.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'cli.grids.clienti.GridClientiAll',
        'cli.grids.clienti.GridClientiEstero',
        'cli.grids.clienti.GridClientiIta',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "clienti": Ext.create('cli.grids.clienti.GridClientiAll',{itemId:'clienti',setCfgPer: true}),
            "clientiita": Ext.create('cli.grids.clienti.GridClientiIta',{itemId:'clientiita',setCfgPer: true}),
            "clientiestero": Ext.create('cli.grids.clienti.GridClientiEstero',{itemId:'clientiestero',setCfgPer: true}),
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        this.callParent(arguments);
    },
    onRunApertura:function(r){
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
        tab.fireEvent('checkColumn',tab); //visualizzazione tasti
    }
});
