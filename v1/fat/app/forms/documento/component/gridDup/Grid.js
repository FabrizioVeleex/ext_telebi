/**
 * Created by luke on 17/03/21.
 */
Ext.define("fat.forms.documento.component.gridDup.Grid", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-fat-forms-documento-griddup",
  requires: ["Ext.grid.column.Action", "Ext.grid.column.Date"],
  minHeight: 120,
  flex: 1,
  bind: {
    store: "{storeMailDup}",
  },
  columns: [
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      dataIndex: "dupOpen",
      items: [
        {
          handler: "dupOpen",
          iconCls: "x-fas fa-eye",
          tooltip: Locale.t("global.btn.open.text"),
        },
      ],

    },
    {
      text: Locale.t("fat.forms.documento.gridmail.datedoc"),
      width: 170,
      menuDisabled: true,
      dataIndex: "creationdate",
      xtype: "datecolumn",
      format: "d/m/Y H:i:s",
    },
    // {
    //   text: Locale.t("fat.forms.documento.gridmail.autore"),
    //   minWidth: 150,
    //   flex: 1,
    //   menuDisabled: true,
    //   dataIndex: "autore",
    // },
  ],
  listeners: {
    itemdblclick: 'dupOpenDbl'
  }
});
