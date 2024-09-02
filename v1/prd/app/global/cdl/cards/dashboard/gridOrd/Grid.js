/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridOrder.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: "global-cdl-cards-dashboard-gridord-grid",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions',
    "prd.global.cdl.cards.dashboard.gridOrder.GridOrder"
  ],
  minHeight: 150,
  viewConfig: {
    emptyText: Locale.t("global.grid.empty")
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
    { text: Locale.t('prd.forms.cdl.columns.idMrp'), dataIndex: 'idMrl', width: 130 },
    { text: Locale.t('prd.forms.cdl.columns.idCdl'), dataIndex: 'id', width: 180 },
    {
      text: Locale.t('prd.forms.cdl.columns.status'), dataIndex: 'status', width: 110,
      renderer: function (value, metadata, record) {
        metadata.tdAttr = 'data-qtip="' + record.get("statusText") + '"';
        return value
      },
    },

    { text: Locale.t('prd.forms.cdl.columns.operation'), dataIndex: 'orders', minWidth: 200, flex: 1 },
  ]
});