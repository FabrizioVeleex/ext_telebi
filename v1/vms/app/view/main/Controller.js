/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('vms.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm',
        'vms.view.forms.controllo.Panel',
        'vms.view.forms.prodotto.Panel',
        'vms.view.grids.controlli.Effettuati',
        'vms.view.grids.controlli.Previsti',
        'vms.view.grids.destinatari.Grid',
        'vms.view.grids.interventi.Completati',
        'vms.view.grids.interventi.Incorso',
        'vms.view.grids.prodotti.Grid',
        'vms.view.grids.sedi.Grid',
        'vms.view.grids.tipi.Grid',
        'vms.view.grids.tipologie.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "prodotti": Ext.create('vms.view.grids.prodotti.Grid',{itemId:'prodotti',setCfgPer: true}),
            "previsti": Ext.create('vms.view.grids.controlli.Previsti',{itemId:'previsti',setCfgPer: true}),
            "effettuati": Ext.create('vms.view.grids.controlli.Effettuati',{itemId:'effettuati',setCfgPer: true}),
            "incorso": Ext.create('vms.view.grids.interventi.Incorso',{itemId:'incorso',setCfgPer: true}),
            "completati": Ext.create('vms.view.grids.interventi.Completati',{itemId:'completati',setCfgPer: true}),
            "tipologie": Ext.create('vms.view.grids.tipologie.Grid',{itemId:'tipologie',setCfgPer: true}),
            "destinatari": Ext.create('vms.view.grids.destinatari.Grid',{itemId:'destinatari',setCfgPer: false}),
            "sedi": Ext.create('vms.view.grids.sedi.Grid',{itemId:'sedi',setCfgPer: false}),
            "tipi": Ext.create('vms.view.grids.tipi.Grid',{itemId:'tipi',setCfgPer: false}),
        }
        if (this.checkRuoli(['99'])) {
            vm.set('titleMenuMain', Locale.t('vms.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('vms.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica o altra app
        if (r.tabella && r.idrecord) {
            if (r['tabella'] === 'TBVMSPROD01') {
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('vms.view.forms.prodotto.Panel', {
                        itemId: 'f' + r.idrecord,
                        record: r,
                        valori: {
                            id: r.idrecord,
                            isnew: 0
                        }
                    }),view)
                }
            }
            if (r['tabella'] === 'TBVMSSCH01') {
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('vms.view.forms.controllo.Panel', {
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

    },
    onBeforeLoadMenuNode: function(store, operation){
        if (!operation.node.get("root")){

        }
    },
    onLoadStoreGrid:function (s) {

    },
    onitemclick : function (pnl,node) {
        this.callParent(arguments);
        let tab = this.panelCenter.child('#'+node.data.itemId);
        tab.fireEvent('checkColumn',tab);
        if (node.data.idpadre) {
            let store
            switch (node.data.itemId){
                case 'previsti': //controlli previsti
                    store=this.panels.previsti.getStore()
                    break;
                case 'effettuati': //controlli effettuati
                    store=this.panels.effettuati.getStore()
                    break;
                case 'incorso': //interventi straordinari in corso
                    store=this.panels.incorso.getStore()
                    break;
                case 'completati': //interventi straordinari completati
                    store=this.panels.completati.getStore()
                    break;
                default: //prodotti
                    tab.fireEvent('checkColumn',tab);
                    store=this.panels.prodotti.getStore()
                    break;
            }
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
});
