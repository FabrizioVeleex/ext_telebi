Ext.define("fat.forms.documento.component.fieldStatus.StatusPos", {
  extend: "Ext.form.FieldSet",
  requires: [
    'fat.forms.documento.component.gridMail.Grid'
  ],
  xtype: "v1-fat-forms-documento-statusPos",
  cls: "app-container",
  style: { "background-color": "#008000bf" },
  hidden: true,
  bind: { hidden: "{statusMailPos}" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      bind: {
        html: Locale.t("fat.forms.documento.cards.infodoc.gridmail.title"),
      },
    },
    { xtype: "v1-fat-forms-documento-gridmail" },
  ],
});
