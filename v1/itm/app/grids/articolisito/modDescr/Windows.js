/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("itm.grids.articolisito.modDescr.Windows", {
  extend: "Ext.window.Window",
  requires: [
    "itm.grids.articolisito.modDescr.Controller",
    "itm.grids.articolisito.modDescr.ViewModel",
    "itm.grids.articolisito.modDescr.GridModDescr",
    "Ext.layout.container.*",
    "Ext.container.Container",
    "Ext.form.*",
  ],
  title: Locale.t("itm.grids.articoli.moddesc.title"),
  ui: "orange",
  bodyPadding: 15,
  modal: true,
  controller: "itm-v1-grids-moddescr",
  viewModel: "itm-v1-grids-moddescr",
  width: 1200,
  height: 720,
  layout: "fit",
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          xtype: "textfield",
          width: 550,
          itemId: "txtFind",
          fieldLabel: Locale.t("itm.grids.articoli.moddesc.label"),
          labelWidth: 150,
          emptyText: Locale.t('itm.grids.articoli.moddesc.find'),
          bind: {
            value: '{txtFind}'
          },
          listeners: {
            change: "onReplaceTxtChange"
          }
        },
        {
          xtype: "textfield",
          width: 400,
          emptyText: Locale.t('itm.grids.articoli.moddesc.replace'),
          bind: {
            value: '{txtReplace}'
          }
        },
        {
          text: Locale.t("itm.grids.articoli.moddesc.btn.replace.text"),
          tooltip: Locale.t("itm.grids.articoli.moddesc.btn.replace.tooltip"),
          handler: "onReplace",
          iconCls: "x-fas fa-exchange-alt",
          disabled: true,
          bind: {
            disabled: "{disableReplace}"
          }
        },
        {
          text: Locale.t("itm.grids.articoli.moddesc.btn.reset.text"),
          tooltip: Locale.t("itm.grids.articoli.moddesc.btn.reset.tooltip"),
          handler: "onReset",
          iconCls: "x-fas fa-backspace",
        },
      ],
    },
    {
      xtype: "toolbar",
      dock: "bottom",
      items: [
        '->',
        {
          text: Locale.t("global.btn.close.text"),
          handler: "onCloseWin",
          iconCls: "x-fas fa-times",
        },

        {
          text: Locale.t("itm.grids.articoli.moddesc.btn.confirm.text"),
          tooltip: Locale.t("itm.grids.articoli.moddesc.btn.confirm.tooltip"),
          handler: "onConfirm",
          iconCls: "x-fas fa-save",
        },
      ],
    },
  ],
  items: [
    {
      xtype: "container",
      padding: "0 10 0 0",
      layout: {
        type: 'hbox', align: 'stretch'
      },
      items: [
        {
          xtype: "gridmoddescr",
          flex: 1,
          height: 650,
          bind: { store: "{gridArticoli}" },
        },
      ],
    },
  ],
  listeners: {
    afterRender: "onAfterRender",
  },
});
