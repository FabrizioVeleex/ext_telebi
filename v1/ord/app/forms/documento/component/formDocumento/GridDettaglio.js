/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("ord.forms.documento.component.formDocumento.GridDettaglio", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-ord-forms-documento-griddettaglio",
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
      text: Locale.t("ord.forms.documento.griddettaglio.num_riga"),
      width: 120,
      menuDisabled: true,
      dataIndex: "num_riga",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.cd_art"),
      width: 170,
      menuDisabled: true,
      dataIndex: "cd_art",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.descrizione"),
      minWidth: 300,
      flex: 1,
      menuDisabled: true,
      dataIndex: "descrizione",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.um"),
      width: 60,
      menuDisabled: true,
      dataIndex: "um",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.qta_ord"),
      width: 120,
      menuDisabled: true,
      dataIndex: "qta_ord",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.qta_cons"),
      width: 120,
      menuDisabled: true,
      dataIndex: "qta_cons",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.saldato"),
      width: 120,
      menuDisabled: true,
      dataIndex: "saldato",
    },
    {
      text: Locale.t("ord.forms.documento.griddettaglio.congelato"),
      width: 120,
      menuDisabled: true,
      dataIndex: "congelato",
    },
    // {
    //   text: Locale.t("ord.forms.documento.gridmail.autore"),
    //   minWidth: 150,
    //   flex: 1,
    //   menuDisabled: true,
    //   dataIndex: "autore",
    // },
  ],
  listeners: {
    // itemdblclick: 'dupOpenDbl'
  }
});
