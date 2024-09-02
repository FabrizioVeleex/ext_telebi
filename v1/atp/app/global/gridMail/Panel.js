/**
 * Created by fabrizio on 19/02/2022.
 */
Ext.define("atp.global.gridMail.Panel", {
  extend: "Ext.form.FieldSet",
  requires: [
    'atp.global.gridMail.Grid',
    'atp.global.gridMail.Store'
  ],
  xtype: "v1-atp-global-gridmail-panel",
  cls: "app-container",
  style: { "background-color": "#008000bf" },
  items: [
    {
      xtype: "box",
      cls: "all-font-medium",
      style: { "text-align": "center" },
      flex: 1,
      bind: {
        html: Locale.t("atp.grids.documenti.column.status_mail.list")  //"__Lista email inviate__",
      },
    },
    {
      xtype: "v1-atp-global-gridmail-grid",
    },
  ],
});
