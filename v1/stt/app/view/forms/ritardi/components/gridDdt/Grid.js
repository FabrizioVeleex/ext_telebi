/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridDdt.Grid", {
  extend: "Ext.grid.GridPanel",
  xtype: "stt-v1-form-ritardi-griddt",
  requires: [],
  style: {
    'webkit-border-radius': '15px',
    '-moz-border-radius': '15px',
    'border-radius': '15px !important'
  },
  title: Locale.t("stt.forms.ritardi.dettaglio.gridddt.title"),
  header: {
    style: {
      backgroundColor: 'lightblue'
    }
  },
  minHeight: 120,
  bind: {
    store: "{storeDdt}",
  },
  selType: "cellmodel",

  columns: [
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridddt.columns.dtbos"),
      minWidth: 120,
      width: 120,
      dataIndex: "data_doc",
      xtype: "datecolumn",
      format: "d/m/Y",
      filter: { type: "date", dateFormat: "Ymd" },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.cli"),
      width: 250,
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Codice cli: ' +
          record.data.cd_sogg_fat +
          "<br>Ragione Sociale: " +
          record.data.rag_soc +
          "<br>Nazionalità: " +
          record.data.cd_naz +
          '" data-qclass="tipCls" data-qwidth=350';
        return `${record.data.cd_naz} - ${record.data.cd_sogg_fat}<br><span style="font-size:smaller;font-style: italic">${record.data.rag_soc}</span>`;
      },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridddt.columns.nrocs"),
      width: 90,
      dataIndex: "num_ord",
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridddt.columns.qtcns"),
      width: 90,
      dataIndex: "qta",
    },
  ],
});
