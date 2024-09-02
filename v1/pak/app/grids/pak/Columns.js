
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("pak.grids.pak.Columns", {
  requires: [
    'Ext.grid.column.Action',
    'Ext.grid.column.Date'
  ],

  myColumns: [
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      dataIndex: "actopen",
      items: [
        {
          handler: "onOpen",
          iconCls: "x-fas fa-eye",
          tooltip: Locale.t("global.btn.open.text"),
        },
      ],
    },
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      dataIndex: "actnote",
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            if (r.data.note !== "") {
              metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.note.yes")}"`;
              return "bd-action-null x-fas fa-info-circle bd-color-green";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.note.no")}"`;
            return "bd-action-null x-fas fa-info-circle y-action-no";
          },
        },
      ],
    },
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      dataIndex: "spool",
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            if (r.data.spool) {
              metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.spool")}"`;
              return "bd-action-null x-fas fa-file-pdf bd-color-blue";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.nospool")}"`;
            return "bd-action-null x-fas fa-file-pdf y-action-no";
          },
        },
      ],
    },
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      dataIndex: "imported",
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            if (r.data.imported === 1) {
              metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.imported.yes")}"`;
              return "bd-action-null x-fas fa-list bd-color-blue";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.imported.no")}"`;
            return "bd-action-null x-fas fa-list y-action-no";
          },
        },
      ],
    },
    {
      text: Locale.t("pak.grids.documenti.column.creationdate"),
      dataIndex: "creationdate",
      width: 160,
      minWidth: 160,
      xtype: "datecolumn",
      format: "d/m/Y H:i",
      filter: { type: "date", dateFormat: "Ymd" },
    },
    {
      xtype: "actioncolumn",
      dataIndex: "status_doc",
      maxWidth: 30,
      minWidth: 30,
      resizable: false,
      items: [
        {
          getClass: function (value, meta) {
            let css = "bd-action-null x-fas ",
              tdAttr;

            switch (value) {
              case -1:
                css += "fa-ban bd-color-red";
                tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.pak.x")}"`;
                break;
              case 0:
                css += "fas fa-walking bd-color-blue";
                tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.pak.a")}"`;
                break;
              case 1:
                css += "fa-check bd-color-green";
                tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.pak.c")}"`;
                break;
              default:
                tdAttr = ""
                break;
            }

            meta.tdAttr = tdAttr;
            return css;
          },
        },
      ],
    },
    // {
    //   xtype: "actioncolumn",
    //   maxWidth: 30,
    //   minWidth: 30,
    //   menuDisabled: true,
    //   dataIndex: "firma",
    //   resizable: false,
    //   items: [
    //     {
    //       getClass: function (v, metadata, r) {
    //         if (r.data.firma === 1) {
    //           metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.signed.yes")}"`;
    //           return "bd-action-null x-fas fa-file-signature bd-color-blue";
    //         }
    //         metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.signed.no")}"`;
    //         return "bd-action-null x-fas fa-file-signature y-action-no";
    //       },
    //     },
    //   ],
    // },
    {
      text: Locale.t("pak.grids.documenti.column.num_doc"),
      dataIndex: "num_doc",
      align: 'right',
      minWidth: 110,
      width: 110,
      filter: { type: "string" },
    },
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      dataIndex: "data_stampa",
      items: [
        {
          getClass: function (v, metadata, r) {
            const datastampa = r.data && r.data['data_stampa']
              ? new Intl.DateTimeFormat('en-US', {
                dateStyle: "short",
                hour12: false,
                timeStyle: 'short'
              }).format(new Date(r.data['data_stampa']))
              : false;
            if (datastampa) {


              metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.localprint.yes")}: ${datastampa}"`;
              return "bd-action-null x-fas fa-print bd-color-green";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.localprint.no")}"`;
            return "bd-action-null x-fas fa-print y-action-no";
          },
        },
      ],
    },
    {
      xtype: "actioncolumn",
      dataIndex: "actemail",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            let css = "bd-action-null x-fas ";
            let tdAttr = "";
            if (r.data.status_mail === -1) {
              tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.status_mail.noemail")}"`;
              css += "fa-envelope-square bd-color-red";
            } else if (r.data.status_mail === 0) {
              tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.status_mail.attesainvio")}"`;
              css += "fa-inbox bd-color-blue";
            } else if (r.data.status_mail === 1) {
              tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.status_mail.inviato")}"`;
              css += "fa-share bd-color-orange";
            } else if (r.data.status_mail === 2) {
              tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.status_mail.letto")}"`;
              css += "fa-envelope-open bd-color-green";
            } else if (r.data.status_mail === 3) {
              tdAttr = `data-qtip="${Locale.t("pak.grids.documenti.column.status_mail.scaricato")}"`;
              css += "fa-envelope-open-text bd-color-green";
            }
            metadata.tdAttr = tdAttr;
            return css;
          },
        },
        {
          getClass: function (v, metadata, r) {
            if (r.data.flagmailstatus === 1) {
              return "bd-action-null x-fas fa-check bd-color-green";
            }
          },
        },
      ],
    },
    // {
    //   text: Locale.t("pak.grids.documenti.column.cd_sogg_fat"), //TODO AGGIUNGERE QUESTI DATI DAL BACKEND
    //   dataIndex: "cd_sogg_fat",
    //   minWidth: 80,
    //   width: 100,
    //   filter: { type: "string" },
    // },
    {
      text: Locale.t("pak.grids.documenti.column.rag_soc"),
      dataIndex: "rag_soc",
      flex: 1,
      width: 250,
      minWidth: 150,
      filter: { type: "string" },
    },
  ],
});

