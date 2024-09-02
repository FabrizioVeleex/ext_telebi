/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridOrdiniInevasi.Grid", {
  extend: "Ext.grid.GridPanel",
  xtype: "stt-v1-form-ritardi-gridordiniinevasi",
  requires: [],
  style: {
    'webkit-border-radius': '15px',
    '-moz-border-radius': '15px',
    'border-radius': '15px !important'
  },
  title: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.title"),
  header: {
    style: {
      backgroundColor: 'red'
    }
  },
  minHeight: 120,
  bind: {
    store: "{storeOrdiniInevasi}",
  },
  selType: "cellmodel",
  viewConfig: {
    emptyText: Locale.t("global.grid.empty"),
    getRowClass: function (record) {
      return record.get("selected") === 1 ? "stt-cli-selected" : "";
    },
  },
  columns: [
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.ordine"),
      width: 120,
      dataIndex: "num_ord",
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Data ordine: ' +
          Ext.Date.format(record.data.data_doc, "m/d/Y") +
          "<br>Data consegna prevista: " +
          Ext.Date.format(record.data.data_cons_conf, "m/d/Y") +
          "<br>Numero ordine: " +
          record.data.num_doc +
          '" data-qclass="tipCls" data-qwidth=200';
        return `${record.data.num_doc} <br> ${Ext.Date.format(record.data.data_cons_conf, "m/d/Y")}`;
      },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.cli"),
      width: 250,
      dataIndex: "cd_sogg_fat",
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
      bind: {
        text: `<center>${Locale.t("stt.forms.ritardi.dettaglio.gridordine.columns.qtaordine")}<br><span style="font-weight: bold">Tot. {totOrdine}</span></center>`
      },
      width: 80,
      dataIndex: "qta_ord",
    },
    {
      bind: {
        text: `<center>${Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.qtaconsegnata")}<br><span style="font-weight: bold">Tot. {totConsegnato}</span></center>`
      },
      width: 80,
      dataIndex: "qta_cons",
    },
    {
      bind: {
        text: `<center>${Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.qtainevasa")}<br><span style="font-weight: bold">Tot. {totInevaso}</span></center>`
      },
      width: 80,
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return record.data.qta_ord - record.data.qta_cons;
      },
    },
  ],
});
