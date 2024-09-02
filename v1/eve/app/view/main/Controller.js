/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('eve.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'eve.view.forms.scheda.Panel',
        'eve.view.grids.eventi.Grid',
        'eve.view.grids.schede.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "eventi": Ext.create('eve.view.grids.eventi.Grid',{itemId:'eventi',setCfgPer: true}),
            "schede": Ext.create('eve.view.grids.schede.Grid',{itemId:'schede',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica
        if (r.tabella && r.idrecord) {
            let form = this.panelCenter.child('#f' + r.idrecord);
            if (form) {
                this.panelCenter.setActiveItem(form);
            }else{
                this.createTabMain(Ext.create('eve.view.forms.scheda.Panel', {
                    itemId: 'f' + r.idrecord,
                    record: r,
                    valori: {
                        id: r.idrecord,
                        isnew: 0
                    }
                }),view)
            }
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
        tab.fireEvent('checkColumn',tab);
        if (node.data.idpadre) {
            let store= this.panels.schede.getStore()
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
});
