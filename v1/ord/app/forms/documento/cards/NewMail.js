/**
 * Created by fabrizio on 11/02/2022.
 */
Ext.define("ord.forms.documento.cards.NewMail", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    "Ext.form.TextField",
    "Ext.form.field.HtmlEditor",
    "Ext.layout.container.HBox",
    'Ext.form.field.File',
    'Ext.layout.container.Fit',
    'Ext.panel.Panel',
    'ord.forms.documento.component.tagAttach.Combo',
    'ord.forms.documento.component.tagEmail.Combo'
  ],
  scrollable: "y",
  bodyPadding: 15,
  buttons: [
    {
      text: "Send",
      ui: "green",
      iconCls: "fas fa-edit",
      handler: "onSendNewEmail",
    },
  ],

  items: [
    {
      xtype: "container",
      items: [
        {
          xtype: "container",
          cls: "app-container",
          style: { "text-align": "center" },
          items: [
            {
              xtype: "box",
              flex: 1,
              bind: {
                html: "{htmlDoc}",
              },
            },
            {
              xtype: "box",
              flex: 1,
              bind: {
                html: "{htmlSogg}",
              },
            },
          ],
        },
        {
          xtype: "box",
          cls: "all-font-medium",
          style: { "text-align": "center", "background-color": "#f57070" },
          hidden: true,
          flex: 1,
          html: "_Non sono stati trovati destinatari per questo documento",
          bind: {
            hidden: "{statusMailNeg1}"
          },
        },
        {
          xtype: "box",
          cls: "app-font-medium",
          style: { "text-align": "center" },
          flex: 1,
        },
        {
          xtype: "container",
          layout: { type: "hbox" },
          hidden: false,
          defaults: { margin: 10, msgTarget: "side" },
          items: [
            {
              xtype: "textfield",
              fieldLabel: Locale.t("ord.forms.documento.fields.subject.label"),
              emptyText: Locale.t("ord.forms.documento.fields.subject.placeholder"),
              flex: 1,
              bind: { value: "{email.subject}" },
            },
          ],
        },
        {
          xtype: "container",
          layout: { type: "hbox" },
          hidden: false,
          defaults: { margin: 10, msgTarget: "side" },
          items: [
            {
              xtype: "textfield",
              fieldLabel: Locale.t("ord.forms.documento.fields.mittente.label"),
              emptyText: Locale.t("ord.forms.documento.fields.mittente.placeholder"),
              flex: 1,
              bind: { value: "{email.mailfrom}" },
              validator: function (val) {
                let validate = true;
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (val === "") {
                  return validate;
                }
                if (!re.test(String(val).trim().toLowerCase())) {
                  validate = "Email non valida";
                }
                return validate;
              },
            },
          ],
        },
        {
          xtype: "container",
          layout: { type: "hbox" },

          defaults: { margin: 10, msgTarget: "side" },
          items: [
            {
              fieldLabel: Locale.t("ord.forms.documento.fields.mailto.label"),
              xtype: "v1-ord-forms-documnto-tagmail",
              flex: 1,
              bind: {
                store: "{storeEmailNew}",
                value: "{record.mailto}",
              },
            },
          ],
        },
        {
          xtype: "container",
          layout: { type: "hbox" },
          hidden: false,
          defaults: { margin: 10, msgTarget: "side" },
          items: [
            {
              xtype: "textfield",
              fieldLabel: Locale.t("ord.forms.documento.fields.replyto.label"),
              emptyText: Locale.t("ord.forms.documento.fields.replyto.placeholder"),
              flex: 1,
              bind: { value: "{email.replyTo}" },
            },
          ],
        },
        {
          xtype: "container",
          layout: { type: "hbox" },
          style: {
            margin: '10px'
          },
          items: [
            {
              fieldLabel: Locale.t("ord.forms.documento.fields.attach.label"),
              xtype: "v1-ord-tagattach-combo",
              flex: 1,
              bind: {
                store: "{storeAttachNew}",
                value: "{email.attach}",
              },
            },
            {
              xtype: 'filefield',
              minWidth: 80,
              width: 80,
              hideLabel: true,
              buttonOnly: true,
              buttonText: Locale.t('global.upload.btn.add.text'),
              listeners: {
                'change': 'onUploadAttach'
              }
            }
          ],
        },
        {
          xtype: "panel",
          layout: { type: "fit" },
          border: true,
          height: 40,
          itemId: "v1-ord-dragattach",
          style: {
            border: "1px solid black",
            margin: "0 10px"
          },
          listeners: {
            afterRender: "afterRenderNewEmail"
          },

          html: '<div class="drag-file-label" style="text-align:center;height:100%;padding-top:10px;color:#8a8a8a">' +
            'Trascina i files qui' +
            '</div>'
        },
        {
          xtype: "progress",
          style: { display: 'content', margin: '0 10px', height: 0 },
          value: 0,
        },
        {
          xtype: "container",
          flex: 1,
          layout: { type: "hbox" },
          defaults: { margin: 10, labelAlign: "top" },
          items: [
            {
              xtype: "htmleditor",
              fieldLabel: Locale.t("ord.forms.documento.fields.corpo"),
              flex: 1,
              autoScroll: true,
              style: "font-size:14px;",
              bind: { value: "{email.corpo}" },
            },
          ],
        },
      ],
    },
  ],
});
