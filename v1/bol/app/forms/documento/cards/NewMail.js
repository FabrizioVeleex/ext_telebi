/**
 * Created by fabrizio on 11/02/2022.
 */
Ext.define("bol.forms.documento.cards.NewMail", {
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
    'bol.forms.documento.component.tagAttach.Combo',
    'bol.forms.documento.component.tagEmail.Combo'
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
          xtype: "box",
          cls: "app-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          bind: {
            html: Locale.t("bol.forms.documento.cards.newmail.title"),
          },
        },
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
          xtype: "container",
          layout: { type: "hbox" },
          hidden: true, // Per adesso non necessario
          defaults: { margin: 10, msgTarget: "side" },
          items: [
            {
              xtype: "textfield",
              fieldLabel: Locale.t("bol.forms.documento.fields.mailfrom"),
              flex: 1,
              bind: { value: "{email.mailfrom}" },
            },
          ],
        },
        {
          xtype: "container",
          layout: { type: "hbox" },

          defaults: { margin: 10, msgTarget: "side" },
          items: [
            {
              fieldLabel: Locale.t("bol.forms.documento.fields.mailto"),
              xtype: "v1-bol-forms-documnto-tagmail",
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
          style: {
            margin: '10px'
          },
          items: [
            {
              fieldLabel: Locale.t("bol.forms.documento.fields.attach.label"),
              xtype: "v1-bol-tagattach-combo",
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
          itemId: "v1-bol-dragattach",
          style: {
            border: "1px solid black",
            margin: "0 10px"
          },
          listeners: {
            afterRender: "afterRenderNewEmail"
          },

          html: '<div class="drag-file-label" style="text-align:center;height:100%;padding-top:10px;color:#8a8a8a">' +
            Locale.t("bol.forms.documento.btn.tagattach.trascina") +
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
              fieldLabel: Locale.t("bol.forms.documento.fields.corpo"),
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
