Ext.define("t40.forms.documento.component.fieldStatus.StatusPos", {
  extend: "Ext.form.FieldSet",
  requires: [
    't40.forms.documento.component.gridMail.Grid'
  ],
  xtype: "v1-t40-forms-documento-statusPos",
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
        html: "Documento inviato ai seguenti indirizzi",
      },
    },
    { xtype: "v1-t40-forms-documento-gridmail" },
  ],
});
