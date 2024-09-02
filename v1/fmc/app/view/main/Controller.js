/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('fmc.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'fmc.view.forms.corso.Panel',
        'fmc.view.forms.scheda.Panel',
        'fmc.view.grids.competenze.Grid',
        'fmc.view.grids.corsi.Effettuati',
        'fmc.view.grids.corsi.Previsti',
        'fmc.view.grids.corsi.Storici',
        'fmc.view.grids.destinatari.Grid',
        'fmc.view.grids.mansioni.Grid',
        'fmc.view.grids.modelli.Grid',
        'fmc.view.grids.schede.Attivi',
        'fmc.view.grids.schede.Passivi',
        'fmc.view.grids.tipologie.Grid',
        'fmc.view.grids.verifiche.Grid',
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "attivi": Ext.create('fmc.view.grids.schede.Attivi',{itemId:'attivi',setCfgPer: true}),
            "passivi": Ext.create('fmc.view.grids.schede.Passivi',{itemId:'passivi',setCfgPer: true}),
            "previsti": Ext.create('fmc.view.grids.corsi.Previsti',{itemId:'previsti',setCfgPer: true}),
            "effettuati": Ext.create('fmc.view.grids.corsi.Effettuati',{itemId:'effettuati',setCfgPer: true}),
            "storici": Ext.create('fmc.view.grids.corsi.Storici',{itemId:'storici',setCfgPer: true}),
            "verifiche": Ext.create('fmc.view.grids.verifiche.Grid',{itemId:'verifiche',setCfgPer: true}),
            "mansioni": Ext.create('fmc.view.grids.mansioni.Grid',{itemId:'mansioni',setCfgPer: false}),
            "competenze": Ext.create('fmc.view.grids.competenze.Grid',{itemId:'competenze',setCfgPer: false}),
            "tipologie": Ext.create('fmc.view.grids.tipologie.Grid',{itemId:'tipologie',setCfgPer: false}),
            "modelli": Ext.create('fmc.view.grids.modelli.Grid',{itemId:'modelli',setCfgPer: false}),
            "destinatari": Ext.create('fmc.view.grids.destinatari.Grid',{itemId:'destinatari',setCfgPer: false})
        }
        if (this.checkRuoli(['99','10'])) {
            vm.set('titleMenuMain', Locale.t('fmc.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('fmc.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        if (r.tabella && r.idrecord) {
            if (r['tabella'] === 'TBFMCSCH01') {
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('fmc.view.forms.scheda.Panel', {
                        itemId: 'f' + r.idrecord,
                        record: r,
                        valori: {
                            id: r.idrecord,
                            isnew: 0
                        }
                    }),view)
                }
            }
            if (r['tabella'] === 'TBFMCCOR01') {
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('fmc.view.forms.corso.Panel', {
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
        tab.fireEvent('checkColumn',tab); //visualizzazione tasti
    }
});
