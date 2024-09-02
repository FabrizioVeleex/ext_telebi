
Ext.define("prd.forms.cdl.Controller", {
  extend: "prd.global.cdl.Controller",
  alias: "controller.prd-controller-cdl",
  mixins: [
    "portal.v1.global.Util",
    "prd.forms.cdl.controller.ManagerCards",
    "prd.forms.cdl.cards.config.Controller",
    "prd.forms.cdl.cards.dashboard.Controller",
    "prd.forms.cdl.cards.order.Controller",
    "prd.global.cdl.cards.history.Controller",
    "prd.global.cdl.cards.queue.Controller",
  ],
  requires: [
    "prd.forms.cdl.Model",
    "prd.forms.cdl.cards.dashboard.Panel",
    "prd.forms.cdl.cards.order.Panel",
    "prd.global.cdl.cards.history.Grid",
    "prd.global.cdl.cards.queue.Grid",
    "prd.global.cdl.cards.order.Panel"
  ],
  init: function () {
    let me = this,
      vm = me.getViewModel();

    this.countSecond = 10;
    this.firstOpen = true;
    this.listCard = [];
    this.globalUrl = "cdl"
    this.customPanel = this.getView().config.custom || ""

    this.globalImage = me.getView().config.iconBrand

    this.toolBarCard = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      scrollable: "x",
      items: this.listCard
    });

    this.form = Ext.create('Ext.panel.Panel', {
      padding: 0,
      layout: {
        type: 'card'
      },
      dockedItems: [
        this.toolBarCard
      ]
    });
    this.callParent(arguments);

  },
  onActivePanel: function () {
    let me = this,
      vm = me.getViewModel()

    if (this.firstOpen === true) {
      this.firstOpen = false;


      // get config
      vm.set("record", Ext.create("prd.forms.cdl.Model", {
        id: me.getView().itemId
      }));
      vm.get("record").load({
        success: function () {
          me.managerView();
        }
      });

    }
    this.callParent(arguments);
  },
  managerView: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record");

    try {
      // Title tab
      vm.set("title", record.data.brand + " - " + record.data.model);

      vm.set("agent", record.data.agent)
      // manager Cards
      me.cards();

    } catch (e) {

      // hide all btn
      vm.set('toolbar.hideMain', true)
      vm.set("panelinfo.consoleInfo", "<h3>" + Locale.t("global.error.generic") + "</h3>");
      this.getView().setActiveItem(this.panelInfo);
      this.onAfterLoadFailure();
    }
  },

})
