Ext.define("orf.forms.documento.component.fieldStatus.Status0", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-orf-forms-documento-status0",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    'orf.forms.documento.component.tagEmail.Combo'
  ],
  cls: "app-container",
  style: { "background-color": "#008000bf" },
  hidden: true,
  bind: { hidden: "{statusMail0}" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      bind: {
        html: "Documento pronto per l'invio",
      },
    },
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side", labelAlign: "top" },
      items: [
        {
          xtype: "v1-orf-forms-documnto-tagmail",
          fieldLabel: "",
          bind: {
            readOnly: "{readOnly}",
            store: "{storeEmailDefault}",
            value: "{record.mailto}",
          },
          flex: 1,
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      itemId: "corpohtml",
      layout: { type: "hbox" },
      defaults: { margin: 10, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "htmleditor",
          fieldLabel: Locale.t("orf.forms.documento.fields.corpo"),
          flex: 1,
          autoScroll: true,
          style: "font-size:14px;",
          bind: {
            readOnly: "{readOnly}", value: "{record.corpo}"
          },

        },
      ],
    },
  ],
});
