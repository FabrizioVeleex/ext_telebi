/**
 * Created by fabrizio on 18/03/2024.
 */
Ext.define('prd.global.cdl.cards.order.orders.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: "global-cdl-cards-order-orders-grid",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions'
  ],
  minHeight: 130,
  scrollable: true,
  setLoading: false,
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    enableTextSelection: true,
    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true,
  },
  columns: [
    { text: Locale.t('prd.forms.cdl.columns.lab'), dataIndex: 'lab', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.partNo'), dataIndex: 'cdArt', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.description'), dataIndex: 'description', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.operation'), dataIndex: 'operation', minWidth: 200, width: 200 },
  ]
});