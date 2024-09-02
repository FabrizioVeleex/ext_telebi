/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.order.cronology.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: "global-cdl-cards-order-cronology-grid",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
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
  sortableColumns: false,
  disableColumnHeaders: true,
  // constrainHeader: true,
  maxHeigth: 500,
  columns: [
    { text: Locale.t('prd.forms.cdl.columns.dateLog'), dataIndex: 'dateLog', xtype: 'datecolumn', format: 'd/m/Y H:i:s', width: 180 },
    { text: Locale.t('prd.forms.cdl.columns.status'), dataIndex: 'status', width: 110 },
    { text: Locale.t('prd.forms.cdl.columns.nextStatus'), dataIndex: 'nextStatus', width: 110 },
    { text: Locale.t('prd.forms.cdl.columns.message'), dataIndex: 'message', minWidth: 300, flex: 1 },
  ]
});