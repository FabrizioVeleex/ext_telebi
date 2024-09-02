/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("t40.grids.panotec.Columns", {
  requires: [
    'Ext.grid.column.Action',
    'Ext.grid.column.Date'
  ],

  myColumns: [
    // {
    //   xtype: "actioncolumn",
    //   maxWidth: 30,
    //   minWidth: 30,
    //   menuDisabled: true,
    //   resizable: false,
    //   dataIndex: "actopen",
    //   items: [
    //     {
    //       handler: "onOpen",
    //       iconCls: "x-fas fa-eye",
    //       tooltip: Locale.t("global.btn.open.text"),
    //     },
    //   ],
    // },
    {
      text: Locale.t("t40.grids.documenti.column.stato"),
      minWidth: 110,
      flex: 1,
      menuDisabled: false,
      dataIndex: 'dati_ordine$stato',
      renderer: function (value, metaData, record) {
        switch (record.data.status) {
          case 99:
            return "Chiuso"
          case 50:
            return "Aperto"
          case 5:
            return "Attesa di invio"
          case 10:
            return "Inviato"
        }
        return ""
        // return record.data.status;
      }
    },
    {
      text: Locale.t("t40.grids.documenti.column.codice"),
      minWidth: 150,
      flex: 1,
      menuDisabled: false,
      dataIndex: 'dati_ordine$codice',
      renderer: function (value, metaData, record) {
        return record.data.dati_ordine.codice;
      }
    },
    {
      text: Locale.t("t40.grids.documenti.column.ordine_produzione"),
      dataIndex: "ordine_produzione",
      align: 'right',
      minWidth: 110,
      width: 110,
      filter: { type: "string" },
    },
    {
      text: Locale.t("t40.grids.documenti.column.qta"),
      dataIndex: "tot_qta",
      align: 'right',
      menuDisabled: true,
      minWidth: 110,
      width: 110,
      filter: { type: "string" },
    },
    {
      text: Locale.t("t40.grids.documenti.column.data_inizio"),
      minWidth: 150,
      flex: 1,
      menuDisabled: true,
      dataIndex: 'dati_produzione$data_inizio',
      xtype: "datecolumn",
      renderer: function (value, metaData, record) {
        let parsedDate = Ext.Date.parse(record.data.dati_produzione.data_inizio, 'Y-m-d H:i:s');
        return Ext.Date.format(parsedDate, "d/m/Y H:i");
      }
    },
    {
      text: Locale.t("t40.grids.documenti.column.data_fine"),
      minWidth: 150,
      flex: 1,
      dataIndex: 'dati_produzione$data_fine',
      xtype: "datecolumn",
      renderer: function (value, metaData, record) {
        let parsedDate = Ext.Date.parse(record.data.dati_produzione.data_fine, 'Y-m-d H:i:s');
        return Ext.Date.format(parsedDate, "d/m/Y H:i");
      }
    },


    //   let me = this,
    //   vm = me.getViewModel(),
    //   record = vm.get("record");
    // debugger;
    // return record.dati_ordine.codice;
    // {
    //   xtype: "actioncolumn",
    //   maxWidth: 30,
    //   minWidth: 30,
    //   menuDisabled: true,
    //   resizable: false,
    //   dataIndex: "data_stampa",
    //   items: [
    //     {
    //       getClass: function (v, metadata, r) {
    //         const datastampa = r.data && r.data['data_stampa']
    //           ? new Intl.DateTimeFormat('en-US', {
    //             dateStyle: "short",
    //             hour12: false,
    //             timeStyle: 'short'
    //           }).format(new Date(r.data['data_stampa']))
    //           : false;
    //         if (datastampa) {
    //           metadata.tdAttr = `data-qtip="${datastampa}"`;
    //           return "bd-action-null x-fas fa-print bd-color-green";
    //         }
    //       },
    //     },
    //   ],
    // },
    // {
    //   xtype: "actioncolumn",
    //   dataIndex: "actemail",
    //   maxWidth: 30,
    //   minWidth: 30,
    //   menuDisabled: true,
    //   resizable: false,
    //   items: [
    //     {
    //       getClass: function (v, metadata, r) {
    //         let css = "bd-action-null x-fas ";
    //         let tdAttr = "";
    //         if (r.data.status_mail === -1) {
    //           tdAttr = `data-qtip="${Locale.t("t40.grids.documenti.column.status_mail.noemail")}"`;
    //           css += "fa-envelope-square bd-color-red";
    //         } else if (r.data.status_mail === 0) {
    //           tdAttr = `data-qtip="${Locale.t("t40.grids.documenti.column.status_mail.attesainvio")}"`;
    //           css += "fa-inbox bd-color-blue";
    //         } else if (r.data.status_mail === 1) {
    //           tdAttr = `data-qtip="${Locale.t("t40.grids.documenti.column.status_mail.inviato")}"`;
    //           css += "fa-share bd-color-orange";
    //         } else if (r.data.status_mail === 2) {
    //           tdAttr = `data-qtip="${Locale.t("t40.grids.documenti.column.status_mail.letto")}"`;
    //           css += "fa-envelope-open bd-color-green";
    //         } else if (r.data.status_mail === 3) {
    //           tdAttr = `data-qtip="${Locale.t("t40.grids.documenti.column.status_mail.scaricato")}"`;
    //           css += "fa-envelope-open-text bd-color-green";
    //         }
    //         metadata.tdAttr = tdAttr;
    //         return css;
    //       },
    //     }
    //   ],
    // },
    // {
    //   text: Locale.t("t40.grids.documenti.column.cd_age"),
    //   dataIndex: "cd_age",
    //   flex: 1,
    //   maxWidth: 60,
    //   minWidth: 60,
    //   filter: { type: "string" },
    // },
    // {
    //   text: Locale.t("t40.grids.documenti.column.cd_sogg_fat"),
    //   dataIndex: "cd_sogg_fat",
    //   minWidth: 80,
    //   width: 100,
    //   filter: { type: "string" },
    // },
    // {
    //   text: Locale.t("t40.grids.documenti.column.rag_soc"),
    //   dataIndex: "rag_soc",
    //   flex: 1,
    //   width: 250,
    //   minWidth: 150,
    //   filter: { type: "string" },
    // },
    // {
    //   text: Locale.t("t40.grids.documenti.column.data_doc"),
    //   dataIndex: "data_doc",
    //   minWidth: 120,
    //   width: 120,
    //   xtype: "datecolumn",
    //   format: "d/m/Y",
    //   filter: { type: "date", dateFormat: "Ymd" },
    // },
  ],
});
