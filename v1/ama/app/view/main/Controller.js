/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('ama.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'ama.view.forms.scheda.Panel',
        'ama.view.grids.annullate.Grid',
        'ama.view.grids.chiuse.Grid',
        'ama.view.grids.incorso.Grid',
        'ama.view.grids.scadute.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "incorso": Ext.create('ama.view.grids.incorso.Grid',{itemId:'incorso',setCfgPer: true}),
            "scadute": Ext.create('ama.view.grids.scadute.Grid',{itemId:'scadute',setCfgPer: true}),
            "chiuse": Ext.create('ama.view.grids.chiuse.Grid',{itemId:'chiuse',setCfgPer: true}),
            "annullate": Ext.create('ama.view.grids.annullate.Grid',{itemId:'annullate',setCfgPer: true})
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
                this.createTabMain(Ext.create('ama.view.forms.scheda.Panel', {
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

    }
});
