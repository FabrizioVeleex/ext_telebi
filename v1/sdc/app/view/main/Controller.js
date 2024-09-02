/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define('sdc.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires:[
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm',
        'sdc.view.forms.ingresso.Panel',
        'sdc.view.forms.sdconfig.Panel',
        'sdc.view.forms.uscita.Panel',
        'sdc.view.grids.archiviate.Grid',
        'sdc.view.grids.archiviateupd.Grid',
        'sdc.view.grids.attive.Grid',
        'sdc.view.grids.attiveupd.Grid',
        'sdc.view.grids.domini.Grid',
        'sdc.view.grids.liste.Grid',
        'sdc.view.grids.scadute.Grid',
        'sdc.view.grids.scaduteupd.Grid'
    ],
    onAfterRender: function () {
        let vm = this.getViewModel()
        this.panels ={
            "uscita": Ext.create('sdc.view.forms.uscita.Panel',{itemId:'uscita',setCfgPer: false}),
            "attive": Ext.create('sdc.view.grids.attive.Grid',{itemId:'attive',setCfgPer: true}),
            "archiviate": Ext.create('sdc.view.grids.archiviate.Grid',{itemId:'archiviate',setCfgPer: true}),
            "scadute": Ext.create('sdc.view.grids.scadute.Grid',{itemId:'scadute',setCfgPer: true}),
            "ingresso": Ext.create('sdc.view.forms.ingresso.Panel',{itemId:'ingresso',setCfgPer: false}),
            "attiveupd": Ext.create('sdc.view.grids.attiveupd.Grid',{itemId:'attiveupd',setCfgPer: true}),
            "archiviateupd": Ext.create('sdc.view.grids.archiviateupd.Grid',{itemId:'archiviateupd',setCfgPer: true}),
            "scaduteupd": Ext.create('sdc.view.grids.scaduteupd.Grid',{itemId:'scaduteupd',setCfgPer: true}),
            "liste": Ext.create('sdc.view.grids.liste.Grid',{itemId:'liste',setCfgPer: true}),
            "domini": Ext.create('sdc.view.grids.domini.Grid', { itemId: 'domini', setCfgPer: false }),
            "sdconfig": Ext.create('sdc.view.forms.sdconfig.Panel', { itemId: 'sdconfig', setCfgPer: false })
        }
        if (this.checkRuoli(['99'])){
            vm.set('titleMenuMain',Locale.t('sdc.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
            vm.set('titleMenuAmm',Locale.t('sdc.main.treemenuamm'))
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

