Ext.define("t40.forms.documento.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    't40.forms.documento.cards.Info',
    't40.forms.documento.cards.NewMail'
  ],

  cards: function (me, record) {
    const vm = me.getViewModel();

    me.listForms = [
      {
        posizione: "info",
        backgroundColor: "LightBlue",
        card: Ext.create("t40.forms.documento.cards.Info"),
        text: Locale.t("t40.forms.documento.cards.infodoc.title"),
        btn: {
          text: Locale.t("t40.forms.documento.cards.infodoc.title"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "info",
          handler: "onClickCard",
        },
      },
      {
        posizione: "anteprima",
        backgroundColor: "",
        card: Ext.create("Ext.form.Panel", {
          posizione: "anteprima",
          scrollable: "y",
          preview: false,
          listeners: {
            show: "onShowPdf",
          },
        }),
        text: Locale.t("t40.forms.documento.cards.anteprima.title"),
        btn: {
          text: Locale.t("t40.forms.documento.cards.anteprima.title"),
          iconCls: "x-fas fa-file-pdf bd-color-blue",
          style: { backgroundColor: "LightBlue" },
          posizione: "anteprima",
          enableToggle: true,
          handler: "onClickCard",
        },
      },
      {
        posizione: "anteprimafirma",
        backgroundColor: "",
        card: Ext.create("Ext.form.Panel", {
          posizione: "anteprimafirma",
          scrollable: "y",
          preview: false,
          listeners: {
            show: "onShowPdf",
          },
        }),
        text: Locale.t("t40.forms.documento.cards.anteprimafirma.title"),
        btn: {
          text: Locale.t("t40.forms.documento.cards.anteprimafirma.title"),
          iconCls: "x-fas fa-pen-fancy bd-color-blue",
          enableToggle: true,
          hidden: record.data.firma === 0,
          style: { backgroundColor: "LightBlue" },
          posizione: "anteprimafirma",
          handler: "onClickCard",
        },
      },
      {
        posizione: "newmail",
        backgroundColor: "",
        card: Ext.create("t40.forms.documento.cards.NewMail", {
          posizione: "newmail",
        }),
        text: Locale.t("t40.forms.documento.cards.newmail.title"),
        btn: {
          text: Locale.t("t40.forms.documento.cards.newmail.title"),
          iconCls: "x-fas fa-at bd-color-blue",
          enableToggle: true,
          hidden: record.data.status_mail < 1,
          style: { backgroundColor: "LightBlue" },
          posizione: "newmail",
          handler: "onClickCard",
        },
      },
    ];

    // gestione attivazione componente su card info
    if (record.data["status_mail"] === -1) {
      vm.set("statusMail0", true);
      vm.set("statusMailNeg1", false);
      vm.set("statusMailPos", true);
    } else if (record.data["status_mail"] === 0) {
      vm.set("statusMail0", false);
      vm.set("statusMailNeg1", true);
      vm.set("statusMailPos", true);
    } else {
      vm.set("statusMail0", true);
      vm.set("statusMailNeg1", true);
      vm.set("statusMailPos", false);
    }

    // imposto valore per il caricamento della lista delle email inviate se status_mail >0
    if (record.data["status_mail"] > 0) {
      let storemail = vm.getStore("storemail");
      storemail.load({
        params: {
          id: record.data.id
        },
      });
    }

    if (record.data["duplicato"] === 1) {
      let storeMailDup = vm.getStore("storeMailDup");
      storeMailDup.loadData(record.data.listDup);
    }

    let storemail = vm.getStore("storemail");
    storemail.loadData(record.data.send);

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
