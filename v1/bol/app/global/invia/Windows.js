/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("bol.global.invia.Windows", {
  extend: "Ext.window.Window",
  requires: [
    "bol.global.invia.Controller",
    "bol.global.invia.ViewModel",
    "bol.global.component.griddocumenti.GridDocumentiInvia",
    "Ext.layout.container.*",
    "Ext.container.Container",
    "Ext.form.*",
  ],
  title: Locale.t("bol.grids.documenti.btn.esegui.invia"),
  ui: "orange",
  bodyPadding: 0,
  modal: true,
  controller: "bol-v1-global-invia",
  viewModel: "bol-v1-global-invia",
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
          text: Locale.t("bol.grids.documenti.btn.invia.text"),
          handler: "onInvia",
          iconCls: "x-fas fa-envelope",
          ui: "green"
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
          x: 10,
          height: 30,
          y: 10,
          xtype: "component",
          // html: "ciao"
          bind: {
            html: "{htmlNumeroDest}",
          },
        },
        {
          x: 10,
          y: 40,
          xtype: "griddocumentiinvia",
          height: 345,
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
