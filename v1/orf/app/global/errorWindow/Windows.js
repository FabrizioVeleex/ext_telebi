/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("orf.global.errorwindow.Windows", {
  extend: "Ext.window.Window",
  requires: [
    "orf.global.errorwindow.Controller",
    "orf.global.errorwindow.ViewModel",
    "orf.global.errorwindow.griderrors",
    "Ext.layout.container.*",
    "Ext.container.Container",
    "Ext.form.*",
  ],
  title: Locale.t('orf.forms.documento.sendmail.title'),
  ui: "red",
  bodyPadding: 0,
  modal: true,
  controller: "orf-v1-global-errorwindow",
  viewModel: "orf-v1-global-errorwindow",
  width: 850,
  height: 570,
  layout: "fit",
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          text: Locale.t("global.btn.ok"),
          handler: "onCloseWin",
          iconCls: "x-fas fa-times",
        },
        // {
        //   text: Locale.t("orf.forms.documento.sendmail.btn"),
        //   handler: "onInvia",
        //   iconCls: "x-fas fa-envelope",
        //   ui: "green"
        // },
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
          html: "_Errore nell'invio mail dei seguenti:"
        },
        {
          x: 10,
          y: 40,
          xtype: "orf-v1-global-errorwindow-griderrors",
          height: 345,
          bind: { store: "{griderrors}" },
        },
      ],
    },
  ],
  listeners: {
    afterRender: "onAfterRender",
  },
});
