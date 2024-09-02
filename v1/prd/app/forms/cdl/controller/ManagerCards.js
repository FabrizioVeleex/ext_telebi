Ext.define("prd.forms.cdl.controller.ManagerCards", {
  extends: "prd.global.cdl.controller.ManagerCards",
  requires: [
    'Ext.form.Panel'
  ],

  cards: function () {

    let me = this,
      vm = me.getViewModel()

    me.listForms = [
      {
        posizione: "dashboard",
        backgroundColor: "LightBlue",
        card: Ext.create("prd.forms.cdl.cards.dashboard.Panel"),
        btn: {
          text: Locale.t("prd.forms.cdl.cards.dashboard.title"),
          iconCls: "x-fas fa-info-circle bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "dashboard",
          handler: "onClickCard",
        },
      },
      {
        posizione: "history",
        backgroundColor: "LightBlue",
        card: Ext.create("prd.global.cdl.cards.history.Grid"),
        btn: {
          text: Locale.t("prd.forms.cdl.cards.history.title"),
          iconCls: "x-fas fa-door-closed bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "history",
          handler: "onClickCard",
        },
      },
      {
        posizione: "config",
        backgroundColor: "LightBlue",
        card: Ext.create("prd.forms.cdl.cards.config.Panel"),
        btn: {
          text: Locale.t("prd.forms.cdl.cards.config.title"),
          iconCls: "x-fas fa-cog bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "config",
          handler: "onClickCard",
        },
      },
      {
        posizione: "queue",
        backgroundColor: "LightBlue",
        card: Ext.create("prd.global.cdl.cards.queue.Grid"),
        btn: {
          text: Locale.t("prd.forms.cdl.cards.queue.title"),
          iconCls: "x-fas fa-tasks bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "queue",
          handler: "onClickCard",
        },
      },
    ];


    me.form.add(me.listForms);
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);

    me.dashboard_mc();
    me.config_mc();
    me.history_mc();

    // aggiungo pdf al tab
    me.onClickCard({
      posizione: vm.get("cardactive"),
    });
  },
  errorCard: function (vm) {
    // vm.set("btn.delete", false);
    // vm.set("btn.cronology", false);
    // vm.set("btn.close", false);
    // vm.set("btn.save", false);
  }
});
