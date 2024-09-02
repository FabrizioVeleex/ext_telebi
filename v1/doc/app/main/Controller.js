/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('doc.main.Controller', {
  extend: 'portal.v1.view.main.ViewController',
  mixins: [
    'portal.v1.global.Util'
  ],
  alias: 'controller.main',

  requires: [
    'portal.v1.view.main.TreeMenu',
    'portal.v1.view.main.TreeMenuAmm'
  ],
  onAfterRender: function () {
    let vm = this.getViewModel()
    this.panels = {
      "uo": Ext.create('doc.view.grids.default.uo.Grid', { itemId: 'uo', setCfgPer: true }),
    }

    if (this.checkRuoli(['99'])) {
      vm.set('titleMenuMain', Locale.t('dip.main.treemenu'))
      this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
      vm.set('titleMenuAmm', Locale.t('dip.main.treemenuamm'))
      this.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm');
    } else {
      this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu');
    }

    this.callParent(arguments);
  },
  onRunApertura: function (r) {
    if (r.tabella && r.idrecord) {
      //apertura da notifica
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
    try {
      if (node.data.idpadre) {
        let grid = this.panels[node.data.itemId];
        if (grid && grid.xtype === 'gridpanel') {
          if (!grid.getStore().getProxy().extraParams) {
            grid.getStore().getProxy().extraParams = {}
          }
          grid.getStore().getProxy().extraParams.idpadre = node.data.idpadre
        }
      }
      this.callParent(arguments);
    } catch (error) {
      //TODO error
    }
  }
});


/*
 onitemclick : function (pnl,node) {
        this.callParent(arguments);
        let tab = this.panelCenter.child('#'+node.data.itemId);
        tab.fireEvent('checkColumn',tab);
        if (node.data.idpadre) {
            let store=this.panels.archiviati.getStore();
            if (!store.isEmptyStore) {
                store.proxy.extraParams.idpadre = node.data.idpadre;
                store.load();
            }
        }
    }
*/