/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.forms.tipologia.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    'prd.forms.tipologia.cards.Tipologia'
  ],

  cards: function (me, record) {
    const vm = me.getViewModel();

    me.listForms = [
      {
        posizione: "tipologia",
        backgroundColor: "LightBlue",
        card: Ext.create("prd.forms.tipologia.cards.Tipologia"),
        text: Locale.t("prd.forms.tipologia.cards.tipologia.title"),
        btn: {
          text: Locale.t("prd.forms.tipologia.cards.tipologia.title"),
          iconCls: "x-fas fa-list bd-color-blue",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "tipologia",
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
  },
  error: function (vm) {
    vm.set("btn.delete", false);
    vm.set("btn.cronology", false);
    vm.set("btn.close", false);
    vm.set("btn.save", false);
  },



});
