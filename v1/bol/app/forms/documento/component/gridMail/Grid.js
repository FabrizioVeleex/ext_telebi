/**
 * Created by luke on 17/03/21.
 */
Ext.define("bol.forms.documento.component.gridMail.Grid", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-bol-forms-documento-gridmail",
  requires: ["Ext.grid.column.Action", "Ext.grid.column.Date"],
  minHeight: 120,
  bind: {
    store: "{storemail}",
  },
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
            let parsedDate = Ext.Date.parse(r.data.infoSend.status_msg.at(-1)[1], 'Y-m-d\\TH:i:s.u\\Z');
            let data = Ext.Date.format(parsedDate, "d/m/Y H:i");
            switch (r.data.infoSend.status) {
              case 0:
                metadata.tdAttr = 'data-qtip="' + Locale.t("bol.forms.documento.cards.infodoc.gridmail.statusmail.attesa") + " " + data + '"';
                css += "fa-envelope bd-color-orange";
                break;
              case 1:
                metadata.tdAttr = 'data-qtip="' + Locale.t("bol.forms.documento.cards.infodoc.gridmail.statusmail.inviato") + " " + data + '"';
                css += "fa-envelope bd-color-green";
                break;
              case 2:
                metadata.tdAttr = 'data-qtip="' + Locale.t("bol.forms.documento.cards.infodoc.gridmail.statusmail.letto") + " " + data + '"';
                css += "fa-envelope-open-text bd-color-green";
                break;
              case 3:
                metadata.tdAttr = 'data-qtip="' + Locale.t("bol.forms.documento.cards.infodoc.gridmail.statusmail.scaricato") + " " + data + '"';
                css += "fa-envelope-open-text bd-color-green";
                break;
              default:
                break;
            }
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
            if (r.data.infoMail.attach.length > 0) {
              metadata.tdAttr = 'data-qtip="' + Locale.t("bol.forms.documento.cards.infodoc.gridmail.attach") + "<hr>" + r.data.infoMail.attach.map(el => el.file).join('<br>') + '"';
              css += "fa-paperclip bd-color-green";
            }
            return css;
          },
        },
      ],
    },
    {
      text: Locale.t("bol.forms.documento.cards.infodoc.gridmail.sendDate"),
      width: 170,
      menuDisabled: true,
      dataIndex: 'infoSend',
      xtype: "datecolumn",
      renderer: function (value) {
        let parsedDate = Ext.Date.parse(value.sendDate, 'Y-m-d\\TH:i:s.u\\Z');
        return Ext.Date.format(parsedDate, "d/m/Y H:i");
      }
    },
    {
      text: Locale.t("bol.forms.documento.cards.infodoc.gridmail.user"),
      minWidth: 150,
      flex: 1,
      menuDisabled: true,
      dataIndex: "user",
    },
    {
      text: Locale.t("bol.forms.documento.cards.infodoc.gridmail.to"),
      minWidth: 150,
      flex: 1,
      menuDisabled: true,
      dataIndex: 'infoMail',
      renderer: function (value) {
        return value.to;
      }
    },
    {
      text: Locale.t("bol.forms.documento.cards.infodoc.gridmail.replyto"),
      minWidth: 150,
      flex: 1,
      menuDisabled: true,
      dataIndex: "infoMail",
      renderer: function (value) {
        return value.replyTo;
      }
    },
  ],
});
