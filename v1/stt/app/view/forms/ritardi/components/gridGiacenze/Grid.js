/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridGiacenze.Grid", {
  extend: "Ext.grid.GridPanel",
  xtype: "stt-v1-form-ritardi-gridordinigiacenze",
  requires: [],
  style: {
    'webkit-border-radius': '15px',
    '-moz-border-radius': '15px',
    'border-radius': '15px !important'
  },
  title: Locale.t("stt.forms.ritardi.dettaglio.gridgiacenza.title"),
  header: {
    style: {
      backgroundColor: 'green'
    }
  },
  minHeight: 120,
  bind: {
    store: "{storeGiacenze}",
  },
  selType: "cellmodel",

  columns: [
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridgiacenza.columns.lastupdate"),
      minWidth: 120,
      width: 120,
      dataIndex: "last_update",
      xtype: "datecolumn",
      format: "d/m/Y",
      filter: { type: "date", dateFormat: "Ymd" },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridgiacenza.columns.cdlotto"),
      width: 110,
      dataIndex: "cd_lotto",
    },

    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridgiacenza.columns.qtagiacenza"),
      width: 110,
      dataIndex: "qta_giacenza",
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridgiacenza.columns.qtaevasa"),
      width: 110,
      dataIndex: "qta_evasa",
    },
  ],
});
