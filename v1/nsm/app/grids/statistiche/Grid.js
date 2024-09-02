Ext.define('nsm.grids.statistiche.Grid', {
  extend: 'portal.v1.view.grids.DefaultGrid',
  requires: [
    'Ext.grid.ActionColumn',
    'Ext.grid.column.Date',
    'nsm.grids.statistiche.Controller',
    'nsm.grids.statistiche.ViewModel'
  ],
  viewModel: 'statistiche',
  controller: 'statistiche',
  forceFit: true,
  autoLoad: true,
  bind: {
    store: '{store}',
    title: '{titolo}'
  },
  columns: [
    {
      xtype: 'actioncolumn',
      width: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      items: [{
        handler: 'onOpen',
        iconCls: 'x-fas fa-eye',
        tooltip: Locale.t('global.btn.open.text')
      }]
    },
    { text: Locale.t('nsm.grids.statistiche.column.totale'), dataIndex: 'totale', minWidth: 150, width: 150, filter: { type: 'number' } },
    { text: Locale.t('nsm.grids.statistiche.column.errore'), dataIndex: 'errore', minWidth: 150, width: 150, filter: { type: 'number' } },
    { text: Locale.t('nsm.grids.statistiche.column.eccezione'), dataIndex: 'eccezione', flex: 1, minWidth: 150, filter: { type: 'number' } },
    {
      text: Locale.t('nsm.grids.statistiche.column.data'),
      dataIndex: 'data',
      width: 180,
      minWidth: 180,
      xtype: 'datecolumn',
      format: 'd/m/Y',
      filter: { type: 'date', dateFormat: 'c' } //Y-m-d
    },

  ],
  listeners: {
    itemdblclick: 'onitemdblclick',
  }
});

