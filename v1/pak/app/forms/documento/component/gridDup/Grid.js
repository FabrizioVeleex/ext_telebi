/**
 * Created by luke on 17/03/21.
 */
Ext.define("pak.forms.documento.component.gridDup.Grid", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-pak-forms-documento-griddup",
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
      text: Locale.t("pak.forms.documento.cards.infodoc.gridmail.datedoc"),
      width: 170,
      menuDisabled: true,
      dataIndex: "creationdate",
      xtype: "datecolumn",
      format: "d/m/Y H:i:s",
    }
  ],
  listeners: {
    itemdblclick: 'dupOpenDbl'
  }
});
