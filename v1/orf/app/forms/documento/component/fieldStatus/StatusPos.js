Ext.define("orf.forms.documento.component.fieldStatus.StatusPos", {
  extend: "Ext.form.FieldSet",
  requires: [
    'orf.forms.documento.component.gridMail.Grid'
  ],
  xtype: "v1-orf-forms-documento-statusPos",
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
        html: Locale.t("orf.forms.documento.cards.infodoc.gridmail.title"),
      },
    },
    { xtype: "v1-orf-forms-documento-gridmail" },
  ],
});