/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridAndamento.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  xtype: "stt-v1-form-ritardi-gridandamento",
  requires: [
    "Ext.form.field.ComboBox",
    "Ext.grid.ActionColumn",
    "Ext.grid.plugin.CellEditing"
  ],
  minHeight: 120,
  bind: {
    store: "{storeAndamento}",
  },
  selType: "cellmodel",
  // viewConfig: {
  //   getRowClass: function (record, index, rowParams, ds) {
  //     if (record.data.qtagiacenza - (record.data.qtaordine - record.data.qtaconsegnata) > 0) {
  //       return 'row-green'
  //     }
  //     if (record.data.qtagiacenza - (record.data.qtaordine - record.data.qtaconsegnata) === 0) {
  //       return 'row-yellow'
  //     }
  //   }
  // },
  columns: [
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.cli"),
      width: 200,
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
        return `${record.data.cd_sogg_fat}<br><span style="font-size:smaller;font-style: italic">${record.data.rag_soc}</span>`;
      },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.naz"),
      width: 70,
      dataIndex: "cd_naz",
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Codice cli: ' +
          record.data.cd_sogg_fat +
          "<br>Ragione Sociale: " +
          record.data.rag_soc +
          "<br>Nazionalità: " +
          record.data.cd_naz +
          '" data-qclass="tipCls" data-qwidth=350';
        return `${record.data.cd_naz}`;
      },
    },
    {
      xtype: 'actioncolumn', width: 30, menuDisabled: true,
      dataIndex: "inmonth",
      items: [{
        getClass: function (value, metaData, record, rowIndex, colIndex, store, view) {
          metaData.tdAttr =
            'data-qtip= "Data ordine: ' +
            Ext.Date.format(record.data.data_doc, "d/m/Y") +
            "<br>Data consegna prevista: " +
            Ext.Date.format(record.data.data_cons_conf, "d/m/Y") +
            '" data-qclass="tipCls" data-qwidth=200';

          if (record.data.in_month === 0) {
            return "x-fas fa-hand-point-up bd-color-green";
          } else if (record.data.in_month === -1) {
            return "x-fas fa-hand-point-left bd-color-red";
          }
          return "x-fas fa-hand-point-right bd-color-orange";
        }
      }]
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.art"),
      dataIndex: "cdart",
      width: 220,
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Data ordine: ' +
          Ext.Date.format(record.data.data_doc, "d/m/Y") +
          "<br>Data consegna prevista: " +
          Ext.Date.format(record.data.data_cons_conf, "d/m/Y") +
          "<br>Numero ordine: " +
          record.data.num_doc +
          "<br>Classe merc.: " +
          record.data.cl_mer +
          "<br>Codice articolo: " +
          record.data.cd_art +
          "<br>Descrizione: " +
          record.data.descr_art +
          '" data-qclass="tipCls" data-qwidth=350';
        return `${record.data.cl_mer} - ${record.data.cd_art}<br><span style="font-size:smaller;font-style: italic">${record.data.descr_art}</span>`;
      },
    },
    {
      headerWrap: false,
      bind: {
        text: `<center>${Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.qtaOrd")}<br><span style="font-weight: bold">Tot. {totOrdini}</span></center>`
      },
      width: 100,
      dataIndex: "qta_ord",
    },
    {
      bind: {
        text: `<center>${Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.qtaCons")}<br><span style="font-weight: bold">Tot. {totConsegnati}</span></center>`
      },
      width: 100,
      dataIndex: "qta_cons",
    },
    {
      bind: {
        text: `<center>${Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.inevaso")}<br><span style="font-weight: bold">Tot. {totInevasi}</span></center>`
      },
      width: 100,
      dataIndex: "inevaso",
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Tot. ordine: ' +
          record.data.qta_ord +
          "<br>Tot. consegnato: " +
          record.data.qta_cons +
          "<br>Tot. inevaso: " +
          (record.data.qta_ord - record.data.qta_cons) +
          '" data-qclass="tipCls" data-qwidth=200';
        return record.data.inevaso;
      },
    },
    {
      text: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.giacenza"),
      width: 80, dataIndex: "qta_giacenza",
      renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr =
          'data-qtip= "Tot. giacenza: ' +
          record.data.qta_giacenza +
          "<br>Tot. Ordinato: " +
          record.data.tot_qta_ord +
          '" data-qclass="tipCls" data-qwidth=200';
        return record.data.qta_giacenza;
      }
    }
  ]
});
