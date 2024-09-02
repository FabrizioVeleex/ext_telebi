/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("fat.forms.documento.component.formDocumento.GridDettaglio", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-fat-forms-documento-griddettaglio",
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
      text: Locale.t("fat.forms.documento.griddettaglio.num_riga"),
      width: 60,
      menuDisabled: true,
      dataIndex: "num_riga",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.num_ord"),
      minWidth: 100,
      menuDisabled: true,
      dataIndex: "num_ord",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.cd_art"),
      width: 100,
      menuDisabled: true,
      dataIndex: "cd_art",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.commento"),
      minWidth: 300,
      flex: 1,
      menuDisabled: true,
      dataIndex: "commento",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.um"),
      width: 60,
      menuDisabled: true,
      dataIndex: "um",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.qta"),
      width: 60,
      menuDisabled: true,
      dataIndex: "qta",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.importo_riga"),
      minWidth: 60,
      menuDisabled: true,
      dataIndex: "importo_riga",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.importo_tot"),
      minWidth: 60,
      menuDisabled: true,
      dataIndex: "importo_tot",
    },
    {
      text: Locale.t("fat.forms.documento.griddettaglio.num_ddt"),
      minWidth: 60,
      menuDisabled: true,
      dataIndex: "num_ddt",
    },
  ]
});
