let SpcUser = [];
Ext.define('ana.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',
    requires:[
        'ana.view.forms.parametri.Panel',
        'ana.view.grids.categorie.Grid',
        'ana.view.grids.categorieatv.Grid',
        'ana.view.grids.comuni.Grid',
        'ana.view.grids.fascicoli.Grid',
        'ana.view.grids.paesi.Grid',
        'ana.view.grids.posizioni.Grid',
        'ana.view.grids.province.Grid',
        'ana.view.grids.sottocategorieatv.Grid',
        'ana.view.grids.stati.Grid',
        'ana.view.grids.uffici.Grid',
        'ana.view.grids.zone.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "categorie": Ext.create('ana.view.grids.categorie.Grid',{itemId:'categorie',setCfgPer: true}),
            "stati": Ext.create('ana.view.grids.stati.Grid',{itemId:'stati',setCfgPer: true}),
            "zone": Ext.create('ana.view.grids.zone.Grid',{itemId:'zone',setCfgPer: true}),
            "paesi": Ext.create('ana.view.grids.paesi.Grid',{itemId:'paesi',setCfgPer: true}),
            "comuni": Ext.create('ana.view.grids.comuni.Grid',{itemId:'comuni',setCfgPer: true}),
            "province": Ext.create('ana.view.grids.province.Grid',{itemId:'province',setCfgPer: true}),
            "uffici": Ext.create('ana.view.grids.uffici.Grid',{itemId:'uffici',setCfgPer: true}),
            "posizioni": Ext.create('ana.view.grids.posizioni.Grid',{itemId:'posizioni',setCfgPer: true}),
            "fascicoli": Ext.create('ana.view.grids.fascicoli.Grid',{itemId:'fascicoli',setCfgPer: true}),
            "categorieatv": Ext.create('ana.view.grids.categorieatv.Grid',{itemId:'categorieatv',setCfgPer: true}),
            "sottocategorieatv": Ext.create('ana.view.grids.sottocategorieatv.Grid',{itemId:'sottocategorieatv',setCfgPer: true}),
            "parametri": Ext.create('ana.view.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false}),
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
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
});
