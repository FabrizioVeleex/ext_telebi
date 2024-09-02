/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("itm.grids.articolisito.editSorting.Windows", {
  extend: "Ext.window.Window",
  requires: [
    "itm.grids.articolisito.editSorting.Controller",
    "itm.grids.articolisito.editSorting.ViewModel",
    "itm.grids.articolisito.editSorting.Grid",
    "Ext.layout.container.*",
    "Ext.container.Container",
    "Ext.form.*",
  ],
  title: Locale.t("itm.grids.articoli.editsorting.title"),
  ui: "orange",
  bodyPadding: 15,
  modal: true,
  controller: "itm-v1-grids-editsorting",
  viewModel: "itm-v1-grids-editsorting",
  width: 500,
  height: 600,
  layout: "fit",
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          text: Locale.t("global.btn.close.text"),
          handler: "onCloseWin",
          iconCls: "x-fas fa-times",
        },

        {
          text: Locale.t("itm.grids.articoli.editsorting.btn.confirm.text"),
          ui: 'green',
          tooltip: Locale.t("itm.grids.articoli.editsorting.btn.confirm.tooltip"),
          handler: "onConfirm",
          hidden: true,
          bind: {
            hidden: '{insert2}'
          },
          iconCls: "x-fas fa-save",
        },
        {
          text: Locale.t("itm.grids.articoli.editsorting.btn.confirm.text"),
          ui: 'green',
          tooltip: Locale.t("itm.grids.articoli.editsorting.btn.confirm.tooltip"),
          handler: "onBeforeConfirm",
          hidden: true,
          bind: {
            hidden: '{!insert2}'
          },
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
          xtype: "itm-v1-grids-articoli-editSorting.grid",
          flex: 1,
          height: 650,
          bind: { store: "{gridAttributi}" },
        },
      ],
    },
  ],
  listeners: {
    afterRender: "onAfterRender",
  },
});
