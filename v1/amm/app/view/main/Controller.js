/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
let SpcUser = []
Ext.define('amm.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires:[
        'amm.view.forms.parametri.Panel',
        'amm.view.grids.alberomenu.Grid',
        'amm.view.grids.aziende.Grid',
        'amm.view.grids.funzioni.Grid',
        'amm.view.grids.moduli.Grid',
        'amm.view.grids.moduliwidget.Grid',
        'amm.view.grids.organigrammi.Grid',
        'amm.view.grids.ruoli.Grid',
        'amm.view.grids.scrivanie.Grid',
        'amm.view.grids.stabilimenti.Grid',
        'amm.view.grids.stampanti.Grid',
        'amm.view.grids.utenti.Grid',
        'amm.view.grids.voci.Grid',
        'amm.view.grids.voci.Startmenu',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "organigrammi": Ext.create('amm.view.grids.organigrammi.Grid',{itemId:'organigrammi',setCfgPer: true}),
            "utenti": Ext.create('amm.view.grids.utenti.Grid',{itemId:'utenti',setCfgPer: true}),
            "ruoli": Ext.create('amm.view.grids.ruoli.Grid',{itemId:'ruoli',setCfgPer: true}),
            "moduli": Ext.create('amm.view.grids.moduli.Grid',{itemId:'moduli',setCfgPer: true}),
            "moduliwidget": Ext.create('amm.view.grids.moduliwidget.Grid',{itemId:'moduliwidget',setCfgPer: true}),
            "startmenu": Ext.create('amm.view.grids.voci.Startmenu',{itemId:'startmenu',setCfgPer: false}),
            "voci": Ext.create('amm.view.grids.voci.Grid',{itemId:'voci',setCfgPer: false}),
            "alberomenu": Ext.create('amm.view.grids.alberomenu.Grid',{itemId:'alberomenu',setCfgPer: false}),
            "aziende": Ext.create('amm.view.grids.aziende.Grid',{itemId:'aziende',setCfgPer: false}),
            "stabilimenti": Ext.create('amm.view.grids.stabilimenti.Grid',{itemId:'stabilimenti',setCfgPer: false}),
            "funzioni": Ext.create('amm.view.grids.funzioni.Grid',{itemId:'funzioni',setCfgPer: false}),
            "scrivanie": Ext.create('amm.view.grids.scrivanie.Grid',{itemId:'scrivanie',setCfgPer: false}),
            "stampanti": Ext.create('amm.view.grids.stampanti.Grid',{itemId:'stampanti',setCfgPer: false}),
            "parametri": Ext.create('amm.view.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        this.callParent(arguments);
    },
    onRunApertura:function(r){
        //apertura da notifica
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

    }
})
