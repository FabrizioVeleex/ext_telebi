/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("spl.global.component.griddocumenti.GridDocumenti", {
  extend: "Ext.grid.Panel",
  alias: "widget.griddocumenti",
  requires: ["Ext.grid.column.Date"],
  viewConfig: {
    getRowClass: function (record) {
      let cls = ''
      return (record.get('spool') === 0) ? cls + " bd-deleterow bd-defaultrow" : cls + " bd-defaultrow";
    }
  },
  columns: [
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      dataIndex: "check_Spool",
      items: [
        {
          getClass: function (view, metadata, record) {
            if (record.get('spool') === 0) {
              metadata.tdAttr = `data-qtip="${Locale.t('spl.grids.documenti.winfirma.nospool')}"`;
              return 'x-fas fa-times bd-action-null bd-color-red';
            }
            return 'x-fas ';
          },
        }
      ],
    },
    {
      text: Locale.t("spl.grids.documenti.column.data_doc"),
      dataIndex: "data_doc",
      width: 120,
      xtype: "datecolumn",
      format: "d/m/Y",
      filter: { type: "date", dateFormat: "Ymd" },
    },
    {
      text: Locale.t("spl.grids.documenti.column.num_doc"),
      dataIndex: "num_doc",
      width: 90,
      filter: { type: "string" },
    },
    {
      text: Locale.t("spl.grids.documenti.column.cd_sogg_fat"),
      dataIndex: "cd_sogg_fat",
      width: 80,
      filter: { type: "string" },
    },
    {
      text: Locale.t("spl.grids.documenti.column.rag_soc"),
      dataIndex: "rag_soc",
      flex: 1,
      minWidth: 100,
      filter: { type: "string" },
    },
    {
      text: Locale.t("spl.grids.documenti.column.descr_trasp"),
      dataIndex: "descr_trasp",
      width: 120,
      filter: { type: "string" },
    },
  ],
});
