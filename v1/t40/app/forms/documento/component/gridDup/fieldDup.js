Ext.define("t40.forms.documento.component.gridDup.fieldDup", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-t40-forms-documento-fieldDup",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    "t40.forms.documento.component.gridDup.Grid"
  ],
  cls: "app-container",
  // style: { "background-color": "#008000bf" },
  hidden: true,
  bind: { hidden: "{!record.duplicato}" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      html: Locale.t("t40.forms.documento.cards.infodoc.griddocs.titledup")
    },
    {
      xtype: "container",
      layout: { type: "hbox" },
      items: [
        { xtype: "v1-t40-forms-documento-griddup" },
      ],
    }
  ],
});
