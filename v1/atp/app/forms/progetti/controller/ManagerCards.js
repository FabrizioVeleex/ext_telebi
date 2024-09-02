/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("atp.forms.progetti.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    'atp.forms.progetti.cards.progetti.Panel',
    'atp.forms.progetti.cards.todo.Panel',
    'atp.forms.progetti.cards.sottoAttivita.Panel',
    'atp.forms.progetti.cards.mail.Mail'
  ],

  cards: function (me, record) {
    const vm = me.getViewModel()
    // let iconClsMail = record.data.mailto.length === 0 ? "x-fas fa-exclamation bd-color-red" : "x-fas fa-at bd-color-blue"
    let iconClsMail = ""
    me.listForms = [
      {
        posizione: "dashboard",
        backgroundColor: "LightBlue",
        card: Ext.create("atp.forms.progetti.cards.progetti.Panel"),
        text: Locale.t("atp.forms.projects.cards.projects.title"),
        btn: {
          text: Locale.t("atp.forms.projects.cards.projects.title"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "dashboard",
          handler: "onClickCard",
        },
      },
      {
        posizione: "todo",
        backgroundColor: "LightBlue",
        card: Ext.create("atp.forms.progetti.cards.todo.Panel"),
        text: Locale.t("atp.forms.projects.cards.todo.title"),
        btn: {
          text: Locale.t("atp.forms.projects.cards.todo.title"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "todo",
          handler: "onClickCard",
        },
      },
      {
        posizione: "sottoAttivita",
        backgroundColor: "LightBlue",
        card: Ext.create("atp.forms.progetti.cards.sottoAttivita.Panel"),
        text: Locale.t("atp.forms.projects.cards.subactivity.title"),
        btn: {
          text: Locale.t("atp.forms.projects.cards.subactivity.title"),
          iconCls: "",
          enableToggle: true,
          style: { backgroundColor: "LightBlue" },
          posizione: "sottoAttivita",
          handler: "onClickCard",
        },
      },
      // {
      //   posizione: "mail",
      //   backgroundColor: "",
      //   card: Ext.create("atp.forms.progetti.cards.mail.Mail", {
      //     posizione: "mail",
      //   }),
      //   text: Locale.t("atp.forms.progetti.cards.mail.title"),
      //   btn: {
      //     text: Locale.t("atp.forms.progetti.cards.mail.title"),
      //     iconCls: iconClsMail,
      //     enableToggle: true,
      //     posizione: "mail",
      //     handler: "onClickCard",
      //     bind: {
      //       hidden: "{readOnly}"
      //     }
      //   },
      // }
    ];

    //Aggiungo cards
    me.form.add(me.listForms);
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);

    me.progetti_ManagerCard();

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
