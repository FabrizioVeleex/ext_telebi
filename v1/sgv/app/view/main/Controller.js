/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
Ext.define('sgv.view.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',
    requires:[
        'portal.v1.view.main.TreeMenu',
        'sgv.view.forms.segnalazione.Panel',
        'sgv.view.grids.segnalazioni.bozze.Grid',
        'sgv.view.grids.segnalazioni.chiuse.Grid',
        'sgv.view.grids.segnalazioni.inoltrate.Grid',
        'sgv.view.grids.segnalazioni.istruttoria.Grid'
    ],
    onAfterRender: function () {
        this.panels ={
            "bozze": Ext.create('sgv.view.grids.segnalazioni.bozze.Grid',{itemId:'bozze',setCfgPer: true}),
            "inoltrate": Ext.create('sgv.view.grids.segnalazioni.inoltrate.Grid',{itemId:'inoltrate',setCfgPer: true}),
            "istruttoria": Ext.create('sgv.view.grids.segnalazioni.istruttoria.Grid',{itemId:'istruttoria',setCfgPer: true}),
            "chiuse": Ext.create('sgv.view.grids.segnalazioni.chiuse.Grid',{itemId:'chiuse',setCfgPer: true})
        }
        this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
        this.callParent(arguments);
    },
    onRunApertura:function(r,view){
        //apertura da notifica
        if (r.tabella && r.idrecord) {
            if (r['tabella'] === 'TBSGVRIC01') {
                let form = this.panelCenter.child('#f' + r.idrecord);
                if (form) {
                    this.panelCenter.setActiveItem(form);
                }else{
                    this.createTabMain(Ext.create('sgv.view.forms.segnalazione.Panel', {
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
        tab.fireEvent('checkColumn',tab)
    }
});

