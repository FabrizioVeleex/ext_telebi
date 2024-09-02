/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("spl.global.component.griddocumenti.GridDocumentiInvia", {
  extend: "Ext.grid.Panel",
  alias: "widget.griddocumentiinvia",
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
            if (record.get('spool') === -2) {
              metadata.tdAttr = `data-qtip="${Locale.t('spl.grids.documenti.winfirma.errorspool')}"`;
              return 'x-fas fa-exclamation bd-action-null bd-color-red';
            }
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
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      dataIndex: "emails",
      items: [
        {
          getClass: function (value, metadata, record) {
            if (value.length !== 0) {
              metadata.tdAttr = `data-qtip="${value.join("</br>")}"`;
              return 'x-fas fa-at bd-action-null bd-color-blue';
            }
          },
        }
      ],
    },
    {
      text: Locale.t("spl.grids.documenti.column.totemail"),
      dataIndex: "totemail",
      width: 90,
      renderer: function (value) {
        if (value === "0")
          return "";
        else
          return value;
      }
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
  ],
  listeners: {
    afterrender: function (grid) {
      // let grid = me.getView().down('griddocumentiinvia')
      // grid.el.mask('Caricamento in corso...')
    }
  }
});
