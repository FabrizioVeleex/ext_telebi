/**
 * Created by fabrizio on 11/02/2022.
 */
Ext.define("t40.forms.documento.cards.NewMail", {
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
    't40.forms.documento.component.tagAttach.Combo',
    't40.forms.documento.component.tagEmail.Combo'
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
            html: "Nuovo invio email",
          },
        },
        {
          xtype: "container",
          cls: "app-container",
          items: [
            {
              xtype: "box",
              flex: 1,
              style: { "text-align": "center" },
              bind: {
                html: "{htmlDoc}",
              },
            },
            {
              xtype: "box",
              flex: 1,
              style: { "text-align": "center" },
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
              fieldLabel: Locale.t("t40.forms.documento.fields.mittente"),
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
              fieldLabel: Locale.t("t40.forms.documento.fields.mailto"),
              xtype: "v1-t40-forms-documnto-tagmail",
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
              fieldLabel: Locale.t("t40.forms.documento.fields.attach.label"),
              xtype: "v1-t40-tagattach-combo",
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
          itemId: "v1-t40-dragattach",
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
              fieldLabel: Locale.t("t40.forms.documento.fields.corpo"),
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
