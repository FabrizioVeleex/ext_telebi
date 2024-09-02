/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('vda.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm',
        'vda.view.forms.parametri.Panel',
        'vda.view.forms.progetto.Panel',
        'vda.view.grids.annullati.Grid',
        'vda.view.grids.chiusi.Grid',
        'vda.view.grids.incorso.Grid',
        'vda.view.grids.sospesi.Grid',
        'vda.view.grids.steps.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "incorso": Ext.create('vda.view.grids.incorso.Grid',{itemId:'incorso',setCfgPer: true}), //progetti in corso
            "sospesi": Ext.create('vda.view.grids.sospesi.Grid',{itemId:'sospesi',setCfgPer: true}), //progetti sospesi
            "chiusi": Ext.create('vda.view.grids.chiusi.Grid',{itemId:'chiusi',setCfgPer: true}), //progetti chiusi
            "annullati": Ext.create('vda.view.grids.annullati.Grid',{itemId:'annullati',setCfgPer: true}), //progetti chiusi
            "steps": Ext.create('vda.view.grids.steps.Grid',{itemId:'steps',setCfgPer: false}), //steps applicazione
            "parametri": Ext.create('vda.view.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false})
        }
        if (this.checkRuoli(['99'])) {
            vm.set('titleMenuMain', Locale.t('vda.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('vda.main.treemenuamm'))
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
                this.createTabMain(Ext.create('vda.view.forms.progetto.Panel', {
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
            let store = this.panels.incorso.getStore()
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
});
