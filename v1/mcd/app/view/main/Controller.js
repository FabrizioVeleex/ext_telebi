/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
let SpcUser = [];
Ext.define('mcd.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',

    requires:[
        'mcd.view.forms.parametri.Panel',
        'mcd.view.grids.archivio.Grid',
        'mcd.view.grids.materiali.Grid',
        'mcd.view.grids.nominativi.Grid',
        'portal.v1.view.main.TreeMenu'
    ],
    onAfterRender: function(){
        //costruisco array viste
        this.panels ={
            "archivio": Ext.create('mcd.view.grids.archivio.Grid',{itemId:'archivio',setCfgPer: true}),
            "nominativi": Ext.create('mcd.view.grids.nominativi.Grid',{itemId:'nominativi',setCfgPer: true}),
            "materiali": Ext.create('mcd.view.grids.materiali.Grid',{itemId:'materiali',setCfgPer: true}),
            "parametri": Ext.create('mcd.view.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu', {});
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
