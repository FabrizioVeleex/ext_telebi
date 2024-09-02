Ext.define('itm.forms.articoli.mixins.Telebi', {
  telebi_managercards: function () {
    let me = this;
    const vm = me.getViewModel();

    me.listForms = [
      {
        posizione: "dashboard",
        backgroundColor: "LightBlue",
        card: Ext.create("itm.forms.articolo.cards.PanelArticolo"),
        text: Locale.t("itm.forms.articolo.cards.dashboard.text"),
        btn: {
          text: Locale.t("itm.forms.articolo.cards.dashboard.text"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "dashboard",
          handler: "onClickCard",
        },
      },
      {
        posizione: "attributi",
        backgroundColor: "LightBlue",
        card: Ext.create("itm.forms.articolo.cards.GridAttributi"),
        text: Locale.t("itm.forms.articolo.cards.attributi.text"),
        btn: {
          text: Locale.t("itm.forms.articolo.cards.attributi.text"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "attributi",
          handler: "onClickCard",
        },
      },
      {
        posizione: "forniture",
        backgroundColor: "LightBlue",
        card: Ext.create("itm.forms.articolo.cards.GridForniture"),
        text: Locale.t("itm.forms.articolo.cards.forniture.text"),
        btn: {
          text: Locale.t("itm.forms.articolo.cards.forniture.text"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "forniture",
          handler: "onClickCard",
        },
      },
    ];


    //Aggiungo cards
    me.form.add(me.listForms);
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);

    this.managerViewDashboard();
    this.managerViewAttributi();
    this.managerViewForniture();
  },
})