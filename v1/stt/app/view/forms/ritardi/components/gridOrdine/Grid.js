/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridOrdine.Grid", {
  extend: "Ext.grid.GridPanel",
  xtype: "stt-v1-form-ritardi-gridordine",
  requires: [],
  style: {
    'webkit-border-radius': '15px',
    '-moz-border-radius': '15px',
    'border-radius': '15px !important'
  },
  title: Locale.t("stt.forms.ritardi.dettaglio.gridordine.title"),
  header: {
    style: {
      backgroundColor: 'lightblue'
    }
  },
  minHeight: 120,
  bind: {
    store: "{storeOrdine}",
  },
  selType: "cellmodel",
  // viewConfig: {
  //   getRowClass: function (record, index, rowParams, ds) {
  //     if ((record.data.qtaordine - record.data.qtaconsegnata) > 0) {
  //       return 'row-red'
  //     }
  //   }
  // },
  columns: [
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.art"),
      width: 220,
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Classe merc.: ' +
          record.data.cl_mer +
          "<br>Codice articolo: " +
          record.data.cd_art +
          "<br>Descrizione: " +
          record.data.descrizione +
          '" data-qclass="tipCls" data-qwidth=350';
        metaData.tdAttr = 'data-qtip= "' + record.data.descrizione + '" data-qclass="tipCls" data-qwidth=200';
        return `${record.data.cl_mer} - ${record.data.cd_art}<br><span style="font-size:smaller;font-style: italic">${record.data.descrizione}</span>`;
      },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridordine.columns.nriga"),
      width: 90,
      dataIndex: "num_riga",
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridordine.columns.qtaordine"),
      width: 90,
      dataIndex: "qta_ord",
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridordine.columns.qtaconsegnata"),
      width: 95,
      dataIndex: "qta_cons",
    },
  ],
});
