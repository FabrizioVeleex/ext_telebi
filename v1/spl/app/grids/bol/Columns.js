/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.bol.Columns", {
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
              metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.note.yes")}"`;
              return "bd-action-null x-fas fa-info-circle bd-color-blue";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.note.no")}"`;
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
      dataIndex: "firma",
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            if (r.data.firma === 1) {
              return "bd-action-null x-fas fa-pencil-alt bd-color-blue";
            }
            return "bd-action-null x-fas y-action-no";
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
            if (r.data.x === 1) {
              metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.spool.d1")}"`;
              return "bd-action-null x-fas fa-times bd-color-red";
            }
            if (r.data.spool === 1) {
              metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.spool.s1")}"`;
              return "bd-action-null x-fas fa-file-pdf bd-color-blue";
            }
            if (r.data.spool === -1) {
              metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.spool.s-1")}"`;
              return "bd-action-null x-fas fa-exclamation-triangle bd-color-orange";
            }
            if (r.data.spool === -2) {
              metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.spool.s-2")}"`;
              return "bd-action-null x-fas fa-exclamation-circle bd-color-red";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.spool-s0")}"`;
            return "bd-action-null x-fas fa-file-pdf y-action-no";
          },
        },
      ],
    },
    {
      text: Locale.t("spl.grids.documenti.column.creationdate"),
      dataIndex: "creationdate",
      width: 160,
      minWidth: 160,
      xtype: "datecolumn",
      format: "d/m/Y H:i",
      filter: { type: "date", dateFormat: "Ymd" },
    },
    {
      text: '',
      dataIndex: "so",
      minWidth: 60,
      width: 60,
      filter: { type: "string" },
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
            let css = "bd-action-null x-fas fa-file-pdf",
              tdAttr = "[n.d.]";
            switch (value) {
              case "V":
                css += "bd-action-null x-fas fa-euro-sign bd-color-blue";
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.bol.v")}"`;
                break;
              case "T":
                css += "bd-action-null x-fas fa-truck bd-color-orange";
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.bol.t")}"`;
                break;
              case "O":
                css += "bd-action-null x-fas fa-gift bd-color-red";
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.bol.0")}"`;
                break;
            }

            meta.tdAttr = tdAttr;
            return css;
          },
        },
      ],
    },
    {
      text: Locale.t("spl.grids.documenti.column.num_doc"),
      dataIndex: "num",
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
              metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.localprint.yes")}: ${datastampa}"`;
              return "bd-action-null x-fas fa-print bd-color-green";
            }
            metadata.tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.localprint.no")}"`;
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
            switch (r.data.status_mail) {
              case -1:
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.status_mail.noemail")}"`;
                css += "fa-envelope-square bd-color-red";
                break;
              case 0:
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.status_mail.attesainvio")}"`;
                css += "fa-inbox bd-color-blue";
                break;
              case 1:
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.status_mail.inviato")}"`;
                css += "fa-share bd-color-orange";
                break;
              case 2:
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.status_mail.letto")}"`;
                css += "fa-envelope-open bd-color-green";
                break;
              case 3:
                tdAttr = `data-qtip="${Locale.t("spl.grids.documenti.column.status_mail.scaricato")}"`;
                css += "fa-envelope-open-text bd-color-green";
                break;
              default:
                break;
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
    {
      text: Locale.t("spl.grids.documenti.column.cd_sogg_fat"),
      dataIndex: "cd_sogg_fat",
      minWidth: 80,
      width: 100,
      filter: { type: "string" },
    },
    {
      text: Locale.t("spl.grids.documenti.column.rag_soc"),
      dataIndex: "rag_soc",
      flex: 1,
      width: 250,
      minWidth: 150,
      filter: { type: "string" },
    },
    {
      text: Locale.t("spl.grids.documenti.column.descr_trasp"),
      dataIndex: "descr_trasp",
      flex: 1,
      width: 250,
      minWidth: 150,
    },
    {
      text: Locale.t("spl.grids.documenti.column.data_doc"),
      dataIndex: "data_doc",
      minWidth: 120,
      width: 120,
      xtype: "datecolumn",
      format: "d/m/Y",
    },
  ],
});
