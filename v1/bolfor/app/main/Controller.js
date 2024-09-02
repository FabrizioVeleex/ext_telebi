/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('bolfor.main.Controller', {
    extend: 'portal.v1.view.main.ViewController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.main',

    requires: [
        'bolfor.forms.parametri.Panel',
        'bolfor.grids.bolle.annullate.Grid',
        'bolfor.grids.bolle.associate.Grid',
        'bolfor.grids.bolle.completate.Grid',
        'bolfor.grids.bolle.nuove.Grid',
        'bolfor.grids.tipologie.Grid',
        'portal.v1.view.main.TreeMenu',
        'portal.v1.view.main.TreeMenuAmm'
    ],
    onAfterRender: function () {
        //costruisco array viste
        let vm = this.getViewModel()
        this.panels = {
            "nuove": Ext.create('bolfor.grids.bolle.nuove.Grid', { itemId: 'nuove', setCfgPer: true }),
            "associate": Ext.create('bolfor.grids.bolle.associate.Grid', { itemId: 'associate', setCfgPer: true }),
            "completate": Ext.create('bolfor.grids.bolle.completate.Grid', { itemId: 'completate', setCfgPer: true }),
            "annullate": Ext.create('bolfor.grids.bolle.annullate.Grid', { itemId: 'annullate', setCfgPer: true }),
            "tipologie": Ext.create('bolfor.grids.tipologie.Grid', { itemId: 'tipologie', setCfgPer: false }),
            "parametri": Ext.create('bolfor.forms.parametri.Panel',{itemId:'parametri',setCfgPer: false})
        }
        if (this.checkRuoli(['99', '10'])) {
            vm.set('titleMenuMain', Locale.t('bolfor.main.treemenu'))
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
            vm.set('titleMenuAmm', Locale.t('bolfor.main.treemenuamm'))
            this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
        } else {
            this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
        }
        this.callParent(arguments);
    },
    onRunApertura: function (r) {
        if (r.tabella && r.idrecord) {

        }
    },
    onInfoUserApp: function (record) {

    },
    onBeforeLoadMenuNode: function (store, operation) {
        if (!operation.node.get("root")) {

        }
    },
    onLoadStoreGrid: function (s) {

    },
    onitemclick: function (pnl, node) {
        this.callParent(arguments);
        let tab = this.panelCenter.child('#' + node.data.itemId);
        tab.fireEvent('checkColumn', tab); //visualizzazione tasti
    }
});
