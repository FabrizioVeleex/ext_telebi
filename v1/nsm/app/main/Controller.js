/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define('nsm.view.main.Controller', {
  extend: 'portal.v1.view.main.ViewController',
  alias: 'controller.main',
  requires: [
    'nsm.view.grids.jobs.Grid',
    'nsm.grids.statistiche.Grid',
    'portal.v1.view.main.TreeMenu',
  ],
  mixins: ['portal.v1.global.Util'],
  onAfterRender: function () {
    let me = this,
      vm = me.getViewModel();

    this.firstOpenSub = true;
    this.panels = {
      "jobs": Ext.create('nsm.view.grids.jobs.Grid', { itemId: 'jobs', setCfgPer: true }),
      "statistiche": Ext.create('nsm.grids.statistiche.Grid', { itemId: 'statistiche', setCfgPer: true }),
    }
    this.mainMenu = Ext.create('portal.v1.view.main.TreeMenu', {});

    this.callParent(arguments);
  },
  onRunApertura: function (r) {
    //apertura da notifica
  },
  onInfoUserApp: function (record) {
    // SpcUser = Ext.decode(record.responseText);
    // this.infoUserApp = Ext.decode(record.responseText);
  },

  onBeforeLoadMenuNode: function (store, operation) {
    if (!operation.node.get("root")) {

    }
  },

  onLoadStoreGrid: function (s) {

  },
  onitemclick: function (pnl, node) {

    this.callParent(arguments);

    // Gestione apertura sub menu
    let me = this;
    let tab = me.panelCenter.child('#' + node.data.itemId);

    // FIXME su prima apertura non caricoa il il filtro desiderato
    if (node.data.id_padre) {
      tab.fireEvent('addFilterApp', node);
    }
    if (this.firstOpenSub) {
      if (!Ext.global.Vars.confMod.main.subMenu || Ext.global.Vars.confMod.main.subMenu === '') {
        Ext.global.Vars.confMod.main.subMenu = 'ALL';
      }

      let rootNode = pnl.node.findChild(node.data.itemId);
      if (rootNode && rootNode.data && rootNode.data.children) {

        let item = rootNode.childNodes.filter(el => el.data.id_padre === Ext.global.Vars.confMod.main.subMenu)
        if (item.length === 1) {
          if (item[0].data.id_padre !== node.data.id_padre) {
            let title = Locale.t('nsm.grids.jobs.title');
            if (item[0].data.id_padre !== 'ALL') {
              title += ` [<i>${item[0].data.text}</i>]`
            }
            pnl.getSelectionModel().select(item[0], false);
            tab.fireEvent('alterTitle', title);
          }
        }
      }

    } else {
      if (Ext.global.Vars.confMod.main.subMenu !== node.data.id_padre) {
        let title = Locale.t('nsm.grids.jobs.title');
        if (node.data.id_padre !== 'ALL') {
          title += ` [<i>${node.data.text}</i>]`
        }
        tab.fireEvent('alterTitle', title);
        Ext.global.Vars.confMod.main.subMenu = node.data.id_padre
        this.setConfMod();
      }
    }
    me.firstOpenSub = false;
  }
});

