/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('gpr.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires: [
        'gpr.view.grids.aziende.Grid',
        'gpr.view.grids.descrizioni.Grid',
        'gpr.view.grids.funzioni.Grid',
        'gpr.view.grids.immagini.Grid',
        'gpr.view.grids.lingue.Grid',
        'gpr.view.grids.prodotti.Grid',
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "prodotti": Ext.create('gpr.view.grids.prodotti.Grid',{itemId:'prodotti',setCfgPer: true}),
            "immagini": Ext.create('gpr.view.grids.immagini.Grid',{itemId:'immagini',setCfgPer: true}),
            "aziende": Ext.create('gpr.view.grids.aziende.Grid',{itemId:'aziende',setCfgPer: false}),
            "lingue": Ext.create('gpr.view.grids.lingue.Grid',{itemId:'lingue',setCfgPer: false}),
            "descrizioni": Ext.create('gpr.view.grids.descrizioni.Grid',{itemId:'descrizioni',setCfgPer: false}),
            "funzioni": Ext.create('gpr.view.grids.funzioni.Grid',{itemId:'funzioni',setCfgPer: false}),

        }
        if (this.checkRuoli(['99','20'])) {
            vm.set('titleMenuMain', Locale.t('gpr.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('gpr.main.treemenuamm'))
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

    }
});
