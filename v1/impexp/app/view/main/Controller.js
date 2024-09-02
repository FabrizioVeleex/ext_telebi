/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('impexp.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires: [
        'impexp.view.grids.esportazioni.Grid',
        'impexp.view.grids.importazioni.Grid',
        'impexp.view.grids.moduli.Grid',
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "importazioni": Ext.create('impexp.view.grids.importazioni.Grid',{itemId:'importazioni',setCfgPer: true}),//importazioni
            "esportazioni": Ext.create('impexp.view.grids.esportazioni.Grid',{itemId:'esportazioni',setCfgPer: true}),//esportazioni
            "moduli": Ext.create('impexp.view.grids.moduli.Grid',{itemId:'moduli',setCfgPer: false}), //moduli disponibili
        }
        if (this.checkRuoli(['99'])) {
            vm.set('titleMenuMain', Locale.t('impexp.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('impexp.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica

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
        let store
        let tab = this.panelCenter.child('#'+node.data.itemId);
        tab.fireEvent('checkview',tab);
        if (node.data.idpadre) {
            if (node.data.itemId==='importazioni') {
                store = this.panels.importazioni.getStore()
            } else {
                store = this.panels.esportazioni.getStore()
            }
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
});
