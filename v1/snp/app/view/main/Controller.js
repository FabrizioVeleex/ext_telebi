/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('snp.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm',
        'snp.view.forms.scheda.Panel',
        'snp.view.grids.destinatari.Grid',
        'snp.view.grids.notifiche.Grid',
        'snp.view.grids.schede.attesa.Grid',
        'snp.view.grids.schede.chiuse.Grid',
        'snp.view.grids.schede.compilate.Grid',
        'snp.view.grids.schede.opzioni.Grid',
        'snp.view.grids.schede.sospese.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "compilate": Ext.create('snp.view.grids.schede.compilate.Grid',{itemId:'compilate',setCfgPer: true}),
            "opzioni": Ext.create('snp.view.grids.schede.opzioni.Grid',{itemId:'opzioni',setCfgPer: true}),
            "attesa": Ext.create('snp.view.grids.schede.attesa.Grid',{itemId:'attesa',setCfgPer: true}),
            "chiuse": Ext.create('snp.view.grids.schede.chiuse.Grid',{itemId:'chiuse',setCfgPer: true}),
            "sospese": Ext.create('snp.view.grids.schede.sospese.Grid',{itemId:'sospese',setCfgPer: true}),
            "destinatari": Ext.create('snp.view.grids.destinatari.Grid',{itemId:'destinatari',setCfgPer: false}),
            "notifiche": Ext.create('snp.view.grids.notifiche.Grid',{itemId:'notifiche',setCfgPer: false})
        }
        if (this.checkRuoli(['99','10'])) {
            vm.set('titleMenuMain', Locale.t('snp.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('snp.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica o altra app
        if (r.tabella && r.idrecord) {
            if (r['tabella'] === 'TBSNPSCH01') {
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('snp.view.forms.scheda.Panel', {
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
        tab.fireEvent('checkColumn',tab)
    }
});
