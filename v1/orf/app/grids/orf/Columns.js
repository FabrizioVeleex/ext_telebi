/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("orf.grids.orf.Columns", {
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
      dataIndex: "spool",
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            if (r.data.spool === 1) {
              metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.printed.yes")}"`;
              return "bd-action-null x-fas fa-print bd-color-orange";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.printed.no")}"`;
            return "bd-action-null x-fas fa-print y-action-no";

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
              metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.imported.yes")}"`;
              return "bd-action-null x-fas fa-list bd-color-blue";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.imported.no")}"`;
            return "bd-action-null x-fas fa-list y-action-no";
          },
        },
      ],
    },
    // {
    //   xtype: "actioncolumn",
    //   maxWidth: 30,
    //   minWidth: 30,
    //   menuDisabled: true,
    //   dataIndex: "actnote",
    //   resizable: false,
    //   items: [
    //     {
    //       getClass: function (v, metadata, r) {
    //         if (r.data.note !== "") {
    //           metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.note.yes")}"`;
    //           return "bd-action-null x-fas fa-info-circle bd-color-red";
    //         }
    //         metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.note.no")}"`;
    //         return "bd-action-null x-fas fa-info-circle y-action-no";
    //       },
    //     },
    //   ],
    // },
    {
      text: Locale.t("orf.grids.documenti.columns.creationdate"),
      dataIndex: "creationdate",
      width: 160,
      minWidth: 160,
      xtype: "datecolumn",
      format: "d/m/Y H:i",
      filter: { type: "date", dateFormat: "Ymd" },
    },
    {
      xtype: "actioncolumn",
      dataIndex: "tipo_spool",
      maxWidth: 30,
      minWidth: 30,
      resizable: false,
      items: [
        {
          getClass: function (value, meta) {
            let css = "bd-action-null x-fas fa-file-pdf ",
              tdAttr;
            if (value === "V") {
              css += " bd-color-blue";
              tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.orf." + value.toLowerCase())}"`;
            } else {
              css += " bd-color-orange";
              tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.orf." + value.toLowerCase())}"`;
            }
            meta.tdAttr = tdAttr;
            return css;
          },
        },
      ],
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
            let css = "bd-action-null x-fas fa-file-pdf ",
              tdAttr;
            if (value === "V") {
              css += " bd-color-blue";
              tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.orf." + value.toLowerCase())}"`;
            } else {
              css += " bd-color-orange";
              tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.orf." + value.toLowerCase())}"`;
            }
            meta.tdAttr = tdAttr;
            return css;
          },
        },
      ],
    },
    {
      text: Locale.t("orf.grids.documenti.columns.num_doc"),
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
              metadata.tdAttr = `data-qtip="${datastampa}"`;
              return "bd-action-null x-fas fa-print bd-color-green";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.no_local_print")}"`;
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
            if (r.data.spool === 1) {
              if (r.data.status_mail === -1) {
                tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.status_mail.noemail")}"`;
                css += "fa-envelope-square bd-color-red";
              } else if (r.data.status_mail === 0) {
                tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.status_mail.attesainvio")}"`;
                css += "fa-inbox bd-color-blue";
              } else if (r.data.status_mail === 1) {
                tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.status_mail.inviato")}"`;
                css += "fa-share bd-color-orange";
              } else if (r.data.status_mail === 2) {
                tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.status_mail.letto")}"`;
                css += "fa-envelope-open bd-color-green";
              } else if (r.data.status_mail === 3) {
                tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.status_mail.scaricato")}"`;
                css += "fa-envelope-open-text bd-color-green";
              }
            } else {
              tdAttr = `data-qtip="${Locale.t("orf.grids.documenti.columns.spool")}"`;
              css += "fa-times y-action-no";
            }
            metadata.tdAttr = tdAttr;
            return css;
          },
        }
      ],
    },
    // {
    //   text: Locale.t("orf.grids.documenti.columns.cd_for"),
    //   dataIndex: "cd_for",
    //   minWidth: 80,
    //   width: 100,
    //   filter: { type: "string" },
    // },
    {
      text: Locale.t("orf.grids.documenti.columns.rag_soc"),
      dataIndex: "rag_soc",
      flex: 1,
      width: 250,
      minWidth: 150,
      filter: { type: "string" },
    },
    {
      text: Locale.t("orf.grids.documenti.columns.data_doc"),
      dataIndex: "data_doc",
      minWidth: 120,
      width: 120,
      xtype: "datecolumn",
      format: "d/m/Y",
      filter: { type: "date", dateFormat: "Ymd" },
    },
  ],
});
