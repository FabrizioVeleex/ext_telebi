Ext.define("t40.forms.documento.component.fieldStatus.StatusNeg1", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-t40-forms-documento-statusNeg1",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    't40.forms.documento.component.tagEmail.Combo'
  ],
  cls: "app-container",
  style: { "background-color": "#f57070" },
  hidden: true,
  bind: { hidden: "{statusMailNeg1}" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      bind: {
        html: "Non sono stati trovati destinatari per questo documento",
      },
    },
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side", labelAlign: "top" },
      items: [
        {
          xtype: "v1-t40-forms-documnto-tagmail",
          bind: {
            readOnly: "{readOnly}",
            store: "{storeEmailDefault}",
            value: "{record.mailto}",
          },
          fieldLabel: "",
          flex: 1,
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 10, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "htmleditor",
          fieldLabel: Locale.t("t40.forms.documento.fields.corpo"),
          flex: 1,
          autoScroll: true,
          style: "font-size:14px;",
          bind: { readOnly: "{readOnly}", value: "{record.corpo}" },
          // itemId: "splinfohtml0",
        },
      ],
    },
  ],
});
