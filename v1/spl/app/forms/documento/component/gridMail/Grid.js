/**
 * Created by fabrizio on 27/11/23.
 */
Ext.define("spl.forms.documento.component.gridMail.Grid", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-spl-forms-documento-gridmail",
  requires: ["Ext.grid.column.Action", "Ext.grid.column.Date"],
  minHeight: 120,
  //TODO TIPS GENERALE 
  columns: [
    {
      xtype: "actioncolumn",
      width: 30,
      minWidth: 30,
      menuDisabled: true,
      items: [
        {
          getClass: function (v, metadata, r) {
            let css = "bd-action-null x-fas ";
            let stato = "",
              user = Ext.String.htmlEncode(r.data.user.name);
            switch (r.data.status) {
              case 0:
                stato = Locale.t("spl.grids.documenti.column.status_mail.attesa")
                css += "fa-clock bd-color-orange";
                break;
              case 1:
                stato = Locale.t("spl.grids.documenti.column.status_mail.inviato")
                css += "fa-envelope bd-color-green";
                break;
              case 2:
                stato = Locale.t("spl.grids.documenti.column.status_mail.letto")
                css += "fa-envelope-open-text bd-color-green";
                break;
              case 3:
                stato = Locale.t("spl.grids.documenti.column.status_mail.scaricato")
                css += "fa-envelope-open-text bd-color-green";
                break;
              default:
                break;
            }

            let logSend = ""
            for (const log of r.data.log) {
              let parsedDate = Ext.Date.parse(log.dateLog, 'Y-m-d\\TH:i:s.u\\Z');
              let data = Ext.Date.format(parsedDate, "d/m/Y H:i");
              logSend += `${data} : ${Ext.String.htmlEncode(log.message)}<br>`
            }
            metadata.tdAttr = `data-qtip="${stato} da: ${user}<hr>${logSend}"`
            return css;
          },
        },
      ],
    },
    {
      xtype: "actioncolumn",
      width: 30,
      minWidth: 30,
      menuDisabled: true,
      items: [
        {
          getClass: function (v, metadata, r) {
            let css = "bd-action-null x-fas ";
            if (r.data.attach && r.data.attach.length > 0) {
              metadata.tdAttr = 'data-qtip="' + Locale.t("spl.forms.documento.cards.infodoc.gridmail.attach") + "<hr>" + r.data.attach.map(el => el.file).join('<br>') + '"';
              css += "fa-paperclip bd-color-green";
            }
            return css;
          },
        },
      ],
    },
    {
      text: Locale.t("spl.forms.documento.cards.infodoc.gridmail.sendDate"),
      width: 170,
      menuDisabled: true,
      xtype: "datecolumn",
      renderer: function (v, metadata, r) {
        let parsedDate = Ext.Date.parse(r.data.to.dateSend, 'Y-m-d\\TH:i:s.u\\Z');
        return Ext.Date.format(parsedDate, "d/m/Y H:i");
      }
    },
    {
      text: Locale.t("spl.forms.documento.cards.infodoc.gridmail.from"),
      minWidth: 150,
      flex: 1,
      menuDisabled: true,
      renderer: function (v, metadata, r) {
        return r.data.from.address;
      }
    },
    {
      text: Locale.t("spl.forms.documento.cards.infodoc.gridmail.to"),
      minWidth: 150,
      flex: 1,
      menuDisabled: true,
      // dataIndex: 'infoMail',
      renderer: function (v, metadata, r) {
        return r.data.to.address;
      }
    },
    // {
    //   text: Locale.t("spl.forms.documento.cards.infodoc.gridmail.replyto"),
    //   minWidth: 150,
    //   flex: 1,
    //   menuDisabled: true,
    //   // dataIndex: "infoMail",
    //   renderer: function (value) {
    //     return value.replyTo;
    //   }
    // },
  ],
});
