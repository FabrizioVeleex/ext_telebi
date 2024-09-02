/**
 * Created by fabrizio on 19/02/2022.
 */
Ext.define("spl.forms.documento.component.gridMail.Panel", {
  extend: "Ext.form.FieldSet",
  requires: [
    'spl.forms.documento.component.gridMail.Grid'
  ],
  xtype: "v1-spl-forms-documento-gridmail-panel",
  cls: "app-container",
  style: { "background-color": "#008000bf" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      bind: {
        html: Locale.t("spl.grids.documenti.column.status_mail.list")  //"__Lista email inviate__",
      },
    },
    {
      xtype: "v1-spl-forms-documento-gridmail",
      bind: {
        store: "{storeMail}",
      },
    },
  ],
});
