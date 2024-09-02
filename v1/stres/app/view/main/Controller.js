/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('stres.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'stres.view.forms.articolo.Panel',
        'stres.view.forms.causale.Panel',
        'stres.view.forms.cliente.Panel',
        'stres.view.forms.globale.Panel'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "globale": Ext.create('stres.view.forms.globale.Panel',{itemId:'globale',setCfgPer: true}),
            "articolo": Ext.create('stres.view.forms.articolo.Panel',{itemId:'articolo',setCfgPer: true}),
            "cliente": Ext.create('stres.view.forms.cliente.Panel',{itemId:'cliente',setCfgPer: true}),
            "causale": Ext.create('stres.view.forms.causale.Panel',{itemId:'causale',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
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
