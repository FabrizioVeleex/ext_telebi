/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("bol.forms.documento.component.formDocumento.GridDettaglio", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-bol-forms-documento-griddettaglio",
  requires: ["Ext.grid.column.Action", "Ext.grid.column.Date"],
  minHeight: 120,
  flex: 1,
  bind: {
    store: "{storeDettaglio}",
  },
  columns: [
    // {
    //   xtype: "actioncolumn",
    //   maxWidth: 30,
    //   minWidth: 30,
    //   menuDisabled: true,
    //   resizable: false,
    //   dataIndex: "detupOpen",
    //   items: [
    //     {
    //       handler: "dupOpen",
    //       iconCls: "x-fas fa-eye",
    //       tooltip: Locale.t("global.btn.open.text"),
    //     },
    //   ],

    // },
    {
      text: Locale.t("bol.forms.documento.cards.dashboard.griddettaglio.num_ord"),
      width: 100,
      menuDisabled: true,
      dataIndex: "num_ord",
    },
    {
      text: Locale.t("bol.forms.documento.cards.dashboard.griddettaglio.cd_art"),
      width: 150,
      menuDisabled: true,
      dataIndex: "cd_art",
    },
    {
      text: Locale.t("bol.forms.documento.cards.dashboard.griddettaglio.commento"),
      minWidth: 300,
      flex: 1,
      menuDisabled: true,
      dataIndex: "commento",
    },
    {
      text: Locale.t("bol.forms.documento.cards.dashboard.griddettaglio.um"),
      width: 60,
      menuDisabled: true,
      dataIndex: "um",
    },
    {
      text: Locale.t("bol.forms.documento.cards.dashboard.griddettaglio.qta"),
      width: 120,
      menuDisabled: true,
      dataIndex: "qta",
    }
  ],
  listeners: {
    // itemdblclick: 'dupOpenDbl'
  }
});
