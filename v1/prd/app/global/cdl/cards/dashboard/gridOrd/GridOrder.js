/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridOrder.GridOrder', {
  extend: 'Ext.grid.Panel',
  xtype: "global-cdl-cards-dashboard-gridord-gridOrder",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions'
  ],
  minHeight: 60,
  viewConfig: {
    emptyText: Locale.t("global.grid.empty")
  },
  store: {
    proxy: {
      type: "memory",
      reader: {
        type: 'json',
      }
    },
    data: []
  },
  columns: [
    { text: Locale.t('prd.forms.cdl.columns.lab'), dataIndex: 'lab', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.partNo'), dataIndex: 'cdArt', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.description'), dataIndex: 'description', minWidth: 200, flex: 1 },
    { text: Locale.t('prd.forms.cdl.columns.operation'), dataIndex: 'operation', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.qtaIni'), dataIndex: 'qtaIni', width: 80 },
    { text: Locale.t('prd.forms.cdl.columns.qtaRim'), dataIndex: 'qtaRim', width: 80 },
    { text: Locale.t('prd.forms.cdl.columns.qtaProd'), dataIndex: 'qtaProd', width: 80, },
  ],
});