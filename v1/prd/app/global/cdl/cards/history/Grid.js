/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.history.Grid', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions',
    "prd.global.cdl.cards.dashboard.gridOrder.GridOrder"
  ],
  minHeight: 150,
  dockedItems: [
    {
      xtype: 'toolbar',
      items: [
        {
          text: Locale.t("prd.forms.cdl.btn.reload.text"),
          ui: "ocra",
          iconCls: "fas fa-sync bd-color-blue",
          handler: "onLoadHistory"
        }
      ]
    }
  ],
  viewConfig: {
    emptyText: Locale.t("global.grid.empty")
  },
  bind: {
    store: "{storeHistory}"
  },
  plugins: {
    widget: {
      ptype: 'rowwidget',
      widget: { xtype: "global-cdl-cards-dashboard-gridord-gridOrder" },
      onWidgetAttach: function (plugin, bodyComponent, record) {
        bodyComponent.getStore().loadData(record.data.records)
      }
    }
  },
  columns: [
    {
      xtype: "actioncolumn", maxWidth: 30, minWidth: 30,
      menuDisabled: true, resizable: false,
      items: [
        { handler: "onOpenOrder", iconCls: "x-fas fa-info-circle bd-color-blue", tooltip: Locale.t("global.btn.open.text") }
      ]
    },
    { text: Locale.t('prd.forms.cdl.columns.idMrp'), dataIndex: 'idMrp', width: 130 },
    { text: Locale.t('prd.forms.cdl.columns.status'), dataIndex: 'status', width: 100 },
    { text: Locale.t('prd.forms.cdl.columns.idCdl'), dataIndex: 'order', minWidth: 100, width: 170 },
    { text: Locale.t('prd.forms.cdl.columns.orders'), dataIndex: 'orders', minWidth: 200, flex: 1 },
    { text: "Data", dataIndex: 'startDate', xtype: 'datecolumn', format: 'd/m/Y', width: 180 },
  ]
});