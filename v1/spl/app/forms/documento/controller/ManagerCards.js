/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("spl.forms.documento.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    'spl.forms.documento.cards.Info',
    'spl.forms.documento.cards.Mail',
    "spl.forms.documento.cards.Json",
    "spl.forms.documento.cards.Spool",
  ],

  cards: function (me, record) {
    const vm = me.getViewModel();

    let hiddenSpool = me.checkRuoli(["99", "10"]) ? false : true;
    let hiddenJson = me.checkRuoli(["99"]) ? false : true;
    let iconClsMail = record.data.mailto.length === 0 ? "x-fas fa-exclamation bd-color-red" : "x-fas fa-at bd-color-blue"


    me.listForms = [
      {
        posizione: "info",
        backgroundColor: "LightBlue",
        card: Ext.create("spl.forms.documento.cards.Info"),
        text: Locale.t("spl.forms.documento.cards.infodoc.title"),
        btn: {
          text: Locale.t("spl.forms.documento.cards.infodoc.title"),
          enableToggle: true,
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
        text: Locale.t("spl.forms.documento.cards.anteprima.title"),
        btn: {
          text: Locale.t("spl.forms.documento.cards.anteprima.title"),
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
        text: Locale.t("spl.forms.documento.cards.anteprimafirma.title"),
        btn: {
          text: Locale.t("spl.forms.documento.cards.anteprimafirma.title"),
          iconCls: "x-fas fa-pen-fancy bd-color-blue",
          enableToggle: true,
          hidden: record.data.firma === 0,
          style: { backgroundColor: "LightBlue" },
          posizione: "anteprimafirma",
          handler: "onClickCard",
        },
      },
      {
        posizione: "mail",
        backgroundColor: "",
        card: Ext.create("spl.forms.documento.cards.Mail", {
          posizione: "mail",
        }),
        text: Locale.t("spl.forms.documento.cards.mail.title"),
        btn: {
          text: Locale.t("spl.forms.documento.cards.mail.title"),
          iconCls: iconClsMail,
          enableToggle: true,
          posizione: "mail",
          handler: "onClickCard",
          bind: {
            hidden: "{readOnly}"
          }
        },
      },
      {
        posizione: "spool",
        backgroundColor: "",
        card: Ext.create("spl.forms.documento.cards.Spool", {
          posizione: "spool",
        }),
        text: Locale.t("spl.forms.processo.cards.spool.title"),
        btn: {
          hidden: hiddenSpool,
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
        card: Ext.create("spl.forms.documento.cards.Json", {
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
      }
    ];

    if (record.data["spool"] < 0) {
      vm.set("exception", false);
    }

    if (record.data["duplicato"] === 1) {
      let storeMailDup = vm.getStore("storeMailDup");
      storeMailDup.loadData(record.data.listDup);
    }


    vm.getStore("storeMail").loadData(record.data.send);

    //Aggiungo cards
    me.form.add(me.listForms);
    me.toolBarCard.setScrollable(true)
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);


    me.managerViewSpool();
    me.managerViewJson();
    me.managerInfo();

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
