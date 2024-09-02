/**
 * Created by fabrizio on 19/11/16.
 */
/*eslint no-undef: "error"*/
Ext.define("fat.global.firma.Windows", {
  extend: "Ext.window.Window",
  requires: [
    "fat.global.firma.Controller",
    "fat.global.firma.ViewModel",
    "fat.global.component.combostampante.ComboStampante",
    "fat.global.component.griddocumenti.GridDocumenti",
    "Ext.container.Container",
    "Ext.layout.container.*",
    "Ext.form.*",
  ],
  title: Locale.t("fat.grids.documenti.winfirma.title"),
  ui: "orange",
  bodyPadding: 15,
  modal: true,
  controller: "winfirma",
  viewModel: "winfirma",
  width: 850,
  height: 680,
  layout: "fit",
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      reference: "firmatoolbar",
      items: [
        {
          text: Locale.t("global.btn.annulla"),
          handler: "onCloseWin",
          iconCls: "x-fas fa-times",
        },
        {
          text: Locale.t("fat.grids.documenti.winfirma.btn.avvia.text"),
          bind: {
            disabled: "{btnfirma}",
            tooltip: "{btnfirmatips}",
          },
          reference: "btnavviafirma",
          handler: "onAvviaFirma",
          iconCls: "x-fas fa-pen-square",
        },
        {
          text: Locale.t("fat.grids.documenti.winfirma.btn.conferma"),
          hidden: true,
          reference: "btnstampa",
          handler: "onStampa",
          iconCls: "x-fas fa-print",
        },
        {
          text: Locale.t("fat.grids.documenti.winfirma.btn.pulisci"),
          hidden: true,
          reference: "btnclearfirma",
          handler: "onClear",
          iconCls: "x-far fa-square",
        },
      ],
    },
  ],
  items: [
    {
      xtype: "container",
      reference: "firmapad",
      hidden: true,
      cls: "bd-bgfirma",
      layout: {
        type: "absolute",
      },
      items: [
        {
          x: 80,
          y: 25,
          xtype: "component",
          bind: {
            html: "{previewstampante}",
          },
        },
        {
          x: 80,
          y: 55,
          xtype: "component",
          cls: "bd-spl-textfirma",
          html:
            "<h2>" +
            Locale.t("fat.grids.documenti.winfirma.digitare") +
            "</h2>",
        },
        {
          x: 0,
          y: 55,
          xtype: "component",
          html:
            '<div id="signature-pad" class="m-signature-pad"> ' +
            '<div  class="mm-signature-pad--body">' +
            '   <canvas style="background-color:white;width: 600px;height: 250px;"></canvas>' +
            "</div></div>",
        },
      ],
    },
    {
      xtype: "container",
      reference: "opzioniFirma",
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
          listeners: {
            change: "onChangeStampante",
          },
        },
        {
          fieldLabel: Locale.t("fat.grids.documenti.winfirma.copie"),
          xtype: "numberfield",
          x: 370,
          y: 0,
          width: 140,
          labelWidth: 60,
          minValue: 0,
          editable: false,
          bind: {
            value: "{copie}",
            disabled: "{noStampa}"
          },
        },
        {
          xtype: 'checkboxfield',
          x: 520,
          y: 0,
          boxLabel: Locale.t("fat.grids.documenti.winfirma.nostampa"),
          name: 'nostampa',
          bind: {
            value: "{noStampa}",
          },
        },
        {
          xtype: "radiofield",
          name: "trasp",
          fieldLabel: Locale.t("fat.grids.documenti.winfirma.ritiro"),
          boxLabel: Locale.t("fat.grids.documenti.winfirma.vettore.check"),
          x: 10,
          y: 40,
          bind: {
            value: "{vettore}",
          },
        },

        {
          xtype: "radiofield",
          name: "trasp",
          boxLabel: Locale.t("fat.grids.documenti.winfirma.conducente.check"),
          x: 200,
          y: 40,
          bind: {
            value: "{conducente}",
          },
        },
        {
          xtype: "radiofield",
          name: "trasp",
          boxLabel: Locale.t("fat.grids.documenti.winfirma.cessionario.check"),
          x: 300,
          y: 40,
          bind: {
            value: "{cessionario}",
          },
        },
        {
          xtype: "textfield",
          fieldLabel: Locale.t("fat.grids.documenti.winfirma.note"),
          width: 750,
          x: 10,
          y: 80,
          bind: {
            value: "{note}",
          },
        },
        {
          xtype: "box",
          hideLabel: true,
          width: 750,
          x: 10,
          y: 125,
          html:
            '<h3><span style="color:red">' +
            Locale.t("fat.grids.documenti.winfirma.nostampa") +
            "</span></h3>",
        },
        {
          x: 20,
          //y:135,
          y: 160,
          xtype: "component",
          html: Locale.t("fat.grids.documenti.winfirma.documenti"),
        },
        {
          x: 10,
          //y:150,
          y: 180,
          xtype: "griddocumenti",
          height: 280,
          bind: { store: "{griddocumenti}" },
        },
        {
          x: 10,
          y: 500,
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
