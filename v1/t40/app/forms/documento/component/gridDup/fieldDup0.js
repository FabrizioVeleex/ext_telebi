Ext.define("t40.forms.documento.component.gridDup.fieldDup0", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-t40-forms-documento-fieldDup0",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    "t40.forms.documento.component.gridDup.Grid"
  ],
  cls: "app-container",
  hidden: true,
  bind: { hidden: "{record.duplicato}" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      html: Locale.t("t40.forms.documento.cards.infodoc.griddocs.titleempty")
    },
  ],
});
