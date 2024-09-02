/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
let SpcUser = []
Ext.define('bolpas.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires:[
        'bolpas.view.forms.bolla.Panel',
        'bolpas.view.grids.annullate.Grid',
        'bolpas.view.grids.attesa.Grid',
        'bolpas.view.grids.codifica.Grid',
        'bolpas.view.grids.completate.Grid',
        'bolpas.view.grids.gestionale.Grid',
        'bolpas.view.grids.posizionare.Grid',
        'bolpas.view.grids.resi.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "attesa": Ext.create('bolpas.view.grids.attesa.Grid',{itemId:'attesa',setCfgPer: true}),
            "codifica": Ext.create('bolpas.view.grids.codifica.Grid',{itemId:'codifica',setCfgPer: true}),
            "gestionale": Ext.create('bolpas.view.grids.gestionale.Grid',{itemId:'gestionale',setCfgPer: true}),
            "resi": Ext.create('bolpas.view.grids.resi.Grid',{itemId:'resi',setCfgPer: true}),
            "posizionare": Ext.create('bolpas.view.grids.posizionare.Grid',{itemId:'posizionare',setCfgPer: true}),
            "completate": Ext.create('bolpas.view.grids.completate.Grid',{itemId:'completate',setCfgPer: true}),
            "annullate": Ext.create('bolpas.view.grids.annullate.Grid',{itemId:'annullate',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica
        if (r.tabella && r.idrecord) {
            if (r['tabella'] === 'TBBOLPAS01' && r['idworkflow'] !=="NEWBL") { //apertura da singola notifica
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('bolpas.view.forms.bolla.Panel', {
                        itemId: 'f' + r.idrecord,
                        record: r,
                        valori: {
                            id: r.idrecord,
                            isnew: 0
                        }
                    }),view)
                }
            }

        }
    },
    onInfoUserApp:function (record) {
        // SpcUser = Ext.decode(record.responseText);
        // this.infoUserApp = Ext.decode(record.responseText);
    },
    onBeforeLoadMenuNode: function(store, operation){
        if (!operation.node.get("root")){

        }
    },
    onLoadStoreGrid:function (s) {

    },
    onitemclick: function (pnl, node) {
        this.callParent(arguments)
        let tab = this.panelCenter.child('#'+node.data.itemId);
        if (node.data.idpadre) {
            tab.fireEvent('checkColumn', tab)
            let store = this.panels.completate.getStore()
            if (store && !store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre
                store.load()
            }
        }
    }
})
