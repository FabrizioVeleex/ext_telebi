/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
let SpcUser = [];
Ext.define('rec.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires:[
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm',
        'rec.view.forms.documento.Panel',
        'rec.view.forms.parametri.Panel',
        'rec.view.forms.reso.Panel',
        'rec.view.grids.annullati.Grid',
        'rec.view.grids.annullatiacg.Grid',
        'rec.view.grids.archiviati.Grid',
        'rec.view.grids.azioni.Grid',
        'rec.view.grids.bozze.Grid',
        'rec.view.grids.causali.Grid',
        'rec.view.grids.chiusi.Grid',
        'rec.view.grids.clienti.Grid',
        'rec.view.grids.famcausali.Grid',
        'rec.view.grids.famiglie.Grid',
        'rec.view.grids.generali.Grid',
        'rec.view.grids.incorso.Grid',
        'rec.view.grids.respinti.Grid',
        'rec.view.grids.rottamazioni.Grid',
        'rec.view.grids.steps.Grid'
    ],
    onAfterRender: function(){
        let vm = this.getViewModel()
        //costruisco array viste
        this.panels ={
            "bozze": Ext.create('rec.view.grids.bozze.Grid',{itemId:'bozze',setCfgPer: true}),
            "incorso": Ext.create('rec.view.grids.incorso.Grid',{itemId:'incorso',setCfgPer: true}),
            "chiusi": Ext.create('rec.view.grids.chiusi.Grid',{itemId:'chiusi',setCfgPer: true}),
            "respinti": Ext.create('rec.view.grids.respinti.Grid',{itemId:'respinti',setCfgPer: true}),
            "annullati": Ext.create('rec.view.grids.annullati.Grid',{itemId:'annullati',setCfgPer: true}),
            "archiviati": Ext.create('rec.view.grids.archiviati.Grid',{itemId:'archiviati',setCfgPer: true}),
            "annullatiacg": Ext.create('rec.view.grids.annullatiacg.Grid',{itemId:'annullatiacg',setCfgPer: true}),
            "generali": Ext.create('rec.view.grids.generali.Grid',{itemId:'generali',setCfgPer: true}),
            "rottamazioni": Ext.create('rec.view.grids.rottamazioni.Grid',{itemId:'rottamazioni',setCfgPer: true}),
            "famiglie": Ext.create('rec.view.grids.famiglie.Grid',{itemId:'famiglie',setCfgPer: true}),
            "causali": Ext.create('rec.view.grids.causali.Grid',{itemId:'causali',setCfgPer: true}),
            "famcausali": Ext.create('rec.view.grids.famcausali.Grid',{itemId:'famcausali',setCfgPer: true}),
            "steps": Ext.create('rec.view.grids.steps.Grid',{itemId:'steps',setCfgPer: true}),
            "azioni": Ext.create('rec.view.grids.azioni.Grid',{itemId:'azioni',setCfgPer: true}),
            "clienti": Ext.create('rec.view.grids.clienti.Grid',{itemId:'clienti',setCfgPer: true}),
            "parametri": Ext.create('rec.view.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false})
        }
        if (this.checkRuoli(['99', '10'])) {
            vm.set('titleMenuMain', Locale.t('rec.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('rec.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica
        if (r.tabella && r.idrecord) {
            if (r['tabella'] === 'TBSPEREC01') { //apertura da singola notifica
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('rec.view.forms.documento.Panel', {
                        itemId: 'f' + r.idrecord,
                        record: r,
                        valori: {
                            id: r.idrecord,
                            isnew: 0
                        }
                    }),view)
                }
            }
            if (r['tabella'] === 'TBSPEREC02') { //apertura da singola notifica
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('rec.view.forms.reso.Panel', {
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
    onitemclick : function (pnl,node) {
        this.callParent(arguments);
        let tab = this.panelCenter.child('#'+node.data.itemId);
        tab.fireEvent('checkColumn',tab);
        if (node.data.idpadre) {
            let store=this.panels.archiviati.getStore();
            if (node.data.itemId === 'incorso') {
                store = this.panels.incorso.getStore()
            }
            if (node.data.itemId === 'chiusi') {
                store = this.panels.chiusi.getStore()
            }
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
})
