/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("ord.global.stampa.Windows", {
  extend: "Ext.window.Window",
  requires: [
    "ord.global.stampa.Controller",
    "ord.global.stampa.ViewModel",
    "ord.global.component.combostampante.ComboStampante",
    "ord.global.component.griddocumenti.GridDocumenti",
    "Ext.layout.container.*",
    "Ext.container.Container",
    "Ext.form.*",
  ],
  title: Locale.t("ord.grids.documenti.winprint.title"),
  ui: "orange",
  bodyPadding: 15,
  modal: true,
  controller: "ord-v1-global-stampa",
  viewModel: "ord-v1-global-stampa",
  width: 850,
  height: 570,
  layout: "fit",
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          text: Locale.t("global.btn.annulla"),
          handler: "onCloseWin",
          iconCls: "x-fas fa-times",
        },
        {
          text: Locale.t("ord.grids.documenti.winprint.conferma"),
          reference: "btnstampa",
          handler: "onStampa",
          iconCls: "x-fas fa-print",
        },
      ],
    },
  ],
  items: [
    {
      xtype: "container",
      layout: {
        type: "absolute",
      },
      padding: "0 0 5 0",
      defaults: {
        labelWidth: 100,
      },
      items: [
        {
          xtype: "comboStampante",
          width: 350,
          x: 10,
          y: 0,
          bind: {
            value: "{idstampante}",
            store: "{combostampanti}",
          },
        },
        {
          fieldLabel: Locale.t("ord.grids.documenti.winprint.copie"),
          xtype: "numberfield",
          x: 380,
          y: 0,
          width: 160,
          labelWidth: 80,
          minValue: 1,
          editable: false,
          bind: {
            value: "{copie}",
          },
        },
        {
          x: 10,
          y: 80,
          xtype: "griddocumenti",
          height: 280,
          bind: { store: "{griddocumenti}" },
        },
        {
          x: 10,
          y: 400,
          xtype: "component",
          bind: {
            html: "{htmlNoSpool}",
          },
        },
      ],
    },
  ],
  listeners: {
    afterRender: "onAfterRender",
  },
});
