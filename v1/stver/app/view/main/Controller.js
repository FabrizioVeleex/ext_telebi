/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('stver.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'stver.view.forms.anno.Panel',
        'stver.view.forms.mese.Panel',
        'stver.view.grids.targets.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "anno": Ext.create('stver.view.forms.anno.Panel',{itemId:'anno',setCfgPer: true}),
            "mese": Ext.create('stver.view.forms.mese.Panel',{itemId:'mese',setCfgPer: true}),
            "targets": Ext.create('stver.view.grids.targets.Grid',{itemId:'targets',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        this.callParent(arguments);
    },
    onInfoUserApp:function (record) {

    },
    onBeforeLoadMenuNode: function(store, operation){
        if (!operation.node.get("root")){

        }
    },
    onLoadStoreGrid:function (s) {

    },
    onRunApertura:function() {

    },
    onitemclick : function (pnl,node) {
        this.callParent(arguments);
       // let tab = this.panelCenter.child('#'+node.data.itemId);
       // tab.fireEvent('checkColumn',tab)
    }
});
