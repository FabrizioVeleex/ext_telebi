/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('prd.main.Controller', {
  extend: 'portal.v1.view.main.ViewController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.main',

  requires: [
    'prd.forms.cdl.Panel',
    'prd.grids.categorie.CategorieGrid',
    'prd.grids.tipologie.TipologieGrid',
    'portal.v1.view.main.TreeMenu',
    'Ext.direct.Manager'
  ],

  init: function () {
    let me = this;

    me.panels = []
    me.loadPanels = false;
    Ext.Ajax.request({
      method: "GET",
      url: Backend.REST_API + "main/getPanels/",
      success: function (res) {
        let response = Ext.decode(res.responseText);
        for (const panel of response.children) {
          me.panels[panel.itemId] = Ext.create(panel.type, panel.options)
        }
        me.loadPanels = true;
        me.getView().fireEvent("afterrender")
      },

    });
  },

  onAfterRender: function () {
    let me = this,
      vm = this.getViewModel()

    if (this.loadPanels === false) return false;

    if (me.checkRuoli(['99'])) {
      vm.set('titleMenuMain', Locale.t('prd.main.treemenu'))
      me.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
      vm.set('titleMenuAmm', Locale.t('prd.main.treemenuamm'))
      me.ammMenu = Ext.create('portal.v1.view.main.TreeMenuAmm')
    } else {
      me.mainMenu = Ext.create('portal.v1.view.main.TreeMenu')
    }
    me.callParent(arguments);
    me.pollingStatus();
  },


  pollingStatus: function () {
    let me = this;

    let listCdl = Object.entries(me.panels).map((k, v) => { return k[0] });
    me.pollingStatus = new Ext.direct.PollingProvider({
      type: 'polling',
      id: "status",
      url: Backend.REST_API + "functions/status/?listCdl=" + listCdl.toString(),
      timeout: 5000,
      interval: 10000
    });

    Ext.Direct.addProvider(me.pollingStatus);
    Ext.direct.Manager.on("status", function (e) {
      for (const item of me.panelCenter.items.items) {
        if (item.cdl === true) {
          item.fireEvent("statusChange", e);
        }
      }
      // let tab = me.panelCenter.getActiveTab()
      // if (tab) {
      //   tab.fireEvent("statusChange", e);
      // }
    })


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
    tab.fireEvent("activePanel");
  }
});
