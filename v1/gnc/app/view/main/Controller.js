/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('gnc.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'gnc.view.forms.parametri.Panel',
        'gnc.view.forms.scheda.Panel',
        'gnc.view.grids.annullate.Grid',
        'gnc.view.grids.chiuse.Grid',
        'gnc.view.grids.incorso.Grid',
        'gnc.view.grids.responsabili.Grid',
        'gnc.view.grids.steps.Grid',
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
           "incorso": Ext.create('gnc.view.grids.incorso.Grid',{itemId:'incorso',setCfgPer: true}),
            "chiuse": Ext.create('gnc.view.grids.chiuse.Grid',{itemId:'chiuse',setCfgPer: true}),
            "annullate": Ext.create('gnc.view.grids.annullate.Grid',{itemId:'annullate',setCfgPer: true}),
            "responsabili": Ext.create('gnc.view.grids.responsabili.Grid',{itemId:'responsabili',setCfgPer: true}),
            "steps": Ext.create('gnc.view.grids.steps.Grid',{itemId:'steps',setCfgPer: false}), //steps applicazione
            "parametri": Ext.create('gnc.view.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false})
        }
        if (this.checkRuoli(['99'])) {
            vm.set('titleMenuMain', Locale.t('gnc.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('gnc.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica
        if (r.tabella && r.idrecord) {
            let form = this.panelCenter.child('#f' + r.idrecord);
            if (form) {
                this.panelCenter.setActiveItem(form);
            }else{
                this.createTabMain(Ext.create('gnc.view.forms.scheda.Panel', {
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
            let store
            if (node.data.itemId==='chiuse') {
                store = this.panels.chiuse.getStore()
            } else {
                store = this.panels.incorso.getStore()
            }
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
});
