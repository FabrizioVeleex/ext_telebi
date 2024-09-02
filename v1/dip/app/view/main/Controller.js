/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define('dip.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    alias: 'controller.main',
    requires:[
        'dip.view.grids.abilitati.Grid',
        'dip.view.grids.elenco.Grid',
        'dip.view.grids.esterni.Grid',
        'dip.view.grids.exdipendenti.Grid',
        'dip.view.grids.filiali.Grid',
        'dip.view.grids.parametri.Grid',
        'dip.view.grids.qualifiche.Grid',
        'dip.view.grids.ruoli.Grid',
        'dip.view.grids.sistema.Grid',
        'dip.view.grids.utenti.Grid',
        'dip.view.grids.utentistampanti.Grid',
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm'
    ],
    mixins: ['portal.v1.global.Util'],
    onAfterRender: function () {
        let vm = this.getViewModel()
        this.panels ={
            "dipendenti": Ext.create('dip.view.grids.utenti.Grid',{itemId:'dipendenti',setCfgPer: true}),
            "elenco": Ext.create('dip.view.grids.elenco.Grid',{itemId:'elenco',setCfgPer: true}),
            "esterni": Ext.create('dip.view.grids.esterni.Grid',{itemId:'esterni',setCfgPer: true}),
            "abilitati": Ext.create('dip.view.grids.abilitati.Grid',{itemId:'abilitati',setCfgPer: true}),
            "exdipendenti": Ext.create('dip.view.grids.exdipendenti.Grid',{itemId:'exdipendenti',setCfgPer: true}),
            "sistema": Ext.create('dip.view.grids.sistema.Grid',{itemId:'sistema',setCfgPer: true}),
            "utentistampanti": Ext.create('dip.view.grids.utentistampanti.Grid',{itemId:'utentistampanti',setCfgPer: true}),
            "filiali": Ext.create('dip.view.grids.filiali.Grid',{itemId:'filiali',setCfgPer: true}),
            "ruoli": Ext.create('dip.view.grids.ruoli.Grid',{itemId:'ruoli',setCfgPer: false}),
            "qualifiche": Ext.create('dip.view.grids.qualifiche.Grid',{itemId:'qualifiche',setCfgPer: false}),
            "parametri": Ext.create('dip.view.grids.parametri.Grid',{itemId:'parametri',setCfgPer: false}),
        }
        if (this.checkRuoli(['99'])){
            vm.set('titleMenuMain',Locale.t('dip.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
            vm.set('titleMenuAmm',Locale.t('dip.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm');
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
        }
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

