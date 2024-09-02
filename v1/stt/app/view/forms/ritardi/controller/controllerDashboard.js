/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.controller.controllerDashboard", {
  requires: [
    "stt.view.forms.ritardi.cards.Dashboard",
    "stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Grid",
    "stt.view.forms.ritardi.components.gridSituazioneOrdiniRighe.Grid",
  ],
  managerViewDashboard: function () {

    let me = this,
      vm = me.getViewModel();

    //----------------------------------------------------------
    // GRID situazione righe ordini
    this.gridSituazioneOrdiniRighe = Ext.create(
      "stt.view.forms.ritardi.components.gridSituazioneOrdiniRighe.Grid"
    );

    //----------------------------------------------------------
    // GRID situazione testate ordini
    this.gridSituazioneOrdiniTestate = Ext.create(
      "stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Grid"
    );

    //----------------------------------------------------------
    // DASHBOARD
    this.dashboard = Ext.create("stt.view.forms.ritardi.cards.Dashboard", {
      items: [
        {
          xtype: "fieldset",
          collapsible: false,
          collapsed: false,
          title: Locale.t("stt.forms.ritardi.dashboard.fs.testata.title"),
          items: [this.gridSituazioneOrdiniTestate],
        },
        {
          xtype: "fieldset",
          collapsible: false,
          collapsed: false,
          title: Locale.t("stt.forms.ritardi.dashboard.fs.righe.title"),
          items: [this.gridSituazioneOrdiniRighe],
        }
      ]
    });

    this.form.add(this.dashboard);
  }
})