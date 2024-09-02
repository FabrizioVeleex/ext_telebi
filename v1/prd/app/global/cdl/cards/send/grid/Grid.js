/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.send.grid.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: "panotec-send-grid",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions'
  ],
  minHeight: 130,
  scrollable: true,
  viewConfig: {
    emptyText: Locale.t('global.grid.empty')
  },
  columns: [
    { text: Locale.t('prd.forms.cdl.columns.lab'), dataIndex: 'lab', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.partNo'), dataIndex: 'cdArt', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.description'), dataIndex: 'description', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.operation'), dataIndex: 'operation', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.startDate'), dataIndex: 'startDate', minWidth: 120 },
    { text: Locale.t('prd.forms.cdl.columns.endDate'), dataIndex: 'endDate', minWidth: 120 }
  ]
});