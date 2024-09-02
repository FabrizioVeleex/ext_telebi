/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ddt.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["bofpub.view.grid.ddt.Controller", "bofpub.view.grid.ddt.ViewModel", "Ext.grid.column.Date", "Ext.grid.column.Action"],
  controller: "ddt",
  viewModel: "ddt",
  minHeight: 150,
  title: "Bolle",
  height: 600,
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  columns: [
    {
      xtype: "actioncolumn",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      width: 30,
      items: [
        {
          getClass: function (v, metadata,rec) {
            if (rec.data.so === 'XA' && rec.data.spool === 0) {
              return null
            }
            return "x-fas fa-file-pdf bd-color-red";
          },
          tooltip: Locale.t("global.btn.pdf.tooltip"),
          typeFile: "pdf",
          tag: "BOL",
          handler: "onDownloadFile",
        },
      ],
    },
    {
      xtype: "actioncolumn",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      width: 30,
      items: [
        {
          getClass: function () {
            return "x-fas fa-file-excel bd-color-green";
          },
          tooltip: Locale.t("global.btn.xlsx.tooltip"),
          typeFile: "xlsx",
          tag: "BOL",
          handler: "onDownloadFile",
        },
      ],
    },
    { text: Locale.t("bofpub.grids.columns.year"), dataIndex: "year", width: 90 },
    { text: Locale.t("bofpub.grids.columns.num_doc"), dataIndex: "num_doc", width: 90, filter: { type: "string" } },
    {text: Locale.t("bofpub.grids.columns.data_doc"),dataIndex: "data_doc", width: 100, xtype: "datecolumn", format: "d/m/Y", filter: { type: "date", dateFormat: "Ymd" }},
    { text: Locale.t("bofpub.grids.columns.descrizione"), dataIndex: "descrizione", flex: 1, filter: { type: "string" } },
  ],
  listeners: {},
});
