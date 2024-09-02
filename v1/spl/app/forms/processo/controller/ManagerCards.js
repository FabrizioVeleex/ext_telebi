/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    'spl.forms.processo.cards.Info',
    'spl.forms.processo.cards.Spool',
    'spl.forms.processo.cards.Json',
  ],

  cards: function (me, record) {
    const vm = me.getViewModel();

    let hiddenJson = me.checkRuoli(["99"]) ? false : true;

    me.listForms = [
      {
        posizione: "info",
        backgroundColor: "LightBlue",
        card: Ext.create("spl.forms.processo.cards.Info"),
        text: Locale.t("spl.forms.processo.cards.dashboard.title"),
        btn: {
          text: Locale.t("spl.forms.processo.cards.dashboard.title"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          iconCls: "x-fas fa-info-circle bd-color-blue",
          posizione: "info",
          handler: "onClickCard",
        },
      },
      {
        posizione: "spool",
        backgroundColor: "",
        card: Ext.create("spl.forms.processo.cards.Spool", {
          posizione: "spool",
        }),
        text: Locale.t("spl.forms.processo.cards.spool.title"),
        btn: {
          text: Locale.t("spl.forms.processo.cards.spool.title"),
          iconCls: "x-fas fa-cloud-download-alt bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "spool",
          handler: "onClickCard",
        },
      },
      {
        posizione: "json",
        backgroundColor: "",
        card: Ext.create("spl.forms.processo.cards.Json", {
          posizione: "json",
        }),
        text: Locale.t("spl.forms.processo.cards.json.title"),
        btn: {
          hidden: hiddenJson,
          text: Locale.t("spl.forms.processo.cards.json.title"),
          iconCls: "x-fas fa-file-code bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "json",
          handler: "onClickCard",
        },
      },
    ];

    //Aggiungo cards
    me.form.add(me.listForms);
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);

    //aggiungo pdf al tab
    me.onClickCard({
      posizione: vm.get("cardactive"),
    });

    me.managerViewSpool();
    me.managerViewJson();
  },

  error: function (vm) {
    vm.set("btn.delete", false);
    vm.set("btn.cronology", false);
    vm.set("btn.close", false);
    vm.set("btn.save", false);
  },



});
