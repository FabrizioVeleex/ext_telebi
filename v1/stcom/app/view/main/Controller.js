/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('stcom.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm',
        'stcom.view.forms.articoli.Panel',
        'stcom.view.forms.vendite.Panel',
        'stcom.view.grids.budgets.Grid',
        'stcom.view.grids.nobudgets.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "vendite": Ext.create('stcom.view.forms.vendite.Panel',{itemId:'vendite',setCfgPer: true}),
            "articoli": Ext.create('stcom.view.forms.articoli.Panel',{itemId:'articoli',setCfgPer: true}),
            "budgets": Ext.create('stcom.view.grids.budgets.Grid',{itemId:'budgets',setCfgPer: false}),
            "nobudgets": Ext.create('stcom.view.grids.nobudgets.Grid',{itemId:'nobudgets',setCfgPer: false})
        }
        if (this.checkRuoli(['99','10'])) {
            vm.set('titleMenuMain', Locale.t('stcom.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('stcom.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){

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
     //   let tab = this.panelCenter.child('#'+node.data.itemId);
     //   tab.fireEvent('checkColumn',tab)
    }
});
