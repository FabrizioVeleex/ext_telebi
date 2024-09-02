Ext.define("fat.forms.documento.component.gridDup.fieldDup", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-fat-forms-documento-fieldDup",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    "fat.forms.documento.component.gridDup.Grid"
  ],
  cls: "app-container",
  // style: { "background-color": "#008000bf" },
  // hidden: true,
  bind: { hidden: "{!record.duplicato}" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      html: Locale.t("fat.forms.documento.griddocs.titledup")
    },
    {
      xtype: "container",
      layout: { type: "hbox" },
      items: [
        { xtype: "v1-fat-forms-documento-griddup" },
      ],
    }
  ],
});
