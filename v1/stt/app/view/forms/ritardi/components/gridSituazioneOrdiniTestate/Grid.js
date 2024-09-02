/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Grid", {
  extend: "Ext.grid.GridPanel",
  xtype: "stt-ritardi-grid-ordini-testate",
  requires: [],
  minHeight: 120,
  bind: {
    store: "{storeOrdiniTestate}",
  },
  selType: "cellmodel",

  columns: [
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.anno"),
      minWidth: 80,
      width: 80,
      dataIndex: "anno",
    },
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.totale"),
      width: 90,
      dataIndex: "totale",
    },
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.chiuse"),
      width: 90,
      dataIndex: "chiuse",
    },
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.incorso"),
      width: 90,
      dataIndex: "incorso",
    },
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.scartate"),
      width: 90,
      dataIndex: "scartate",
    },
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.annullate"),
      width: 90,
      dataIndex: "annullate",
    },
    {
      text: Locale.t("stt.forms.ritardi.dashboard.fs.testata.columns.bloccate"),
      width: 90,
      dataIndex: "bloccate",
    },
  ],
});
