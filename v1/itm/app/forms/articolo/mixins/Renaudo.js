Ext.define('itm.forms.articoli.mixins.Renaudo', {
  rnd_managercards: function () {
    let me = this,
      vm = me.getViewModel(),
      readOnly = vm.get("readOnly")
    console.log(readOnly)


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
          hidden: readOnly,
          text: Locale.t("itm.forms.articolo.cards.forniture.text"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "forniture",
          handler: "onClickCard",
        },
      },
      {
        posizione: "docs",
        backgroundColor: "LightBlue",
        card: Ext.create("itm.forms.articolo.cards.GridDocs"),
        text: Locale.t("itm.forms.articolo.cards.docs.text"),
        btn: {
          hidden: readOnly,
          text: Locale.t("itm.forms.articolo.cards.docs.text"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "docs",
          handler: "onClickCard",
        },
      },
    ];


  },
})