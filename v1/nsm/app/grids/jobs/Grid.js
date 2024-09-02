Ext.define('nsm.view.grids.jobs.Grid', {
  extend: 'portal.v1.view.grids.DefaultGrid',
  requires: [
    'Ext.grid.ActionColumn',
    'Ext.grid.column.Date',
    'nsm.view.grids.jobs.Controller',
    'nsm.view.grids.jobs.Model'
  ],
  viewModel: 'jobs',
  controller: 'jobs',
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
    {
      xtype: 'actioncolumn',
      width: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      items: [
        {
          getClass: function (view, meta, record) {
            if (record.get('enable') === true) {
              meta.tdAttr = 'data-qtip="' + Locale.t('nsm.grids.jobs.column.enable') + '"';
              return "bd-action-null x-fas fa-play bd-color-green";
            }
            return "bd-action-null x-fas fa-stop bd-color-red";
          }
        }]
    },
    {
      xtype: 'actioncolumn',
      width: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      items: [
        {
          getClass: function (view, meta, record) {
            if (record.get('running') === true) {
              meta.tdAttr = 'data-qtip="' + Locale.t('nsm.grids.jobs.column.enable') + '"';
              return "bd-action-null x-fas fa-running bd-color-blue";
            }

            return "bd-action-null x-fas";
          }
        }]
    },
    { text: Locale.t('nsm.grids.jobs.column.applicazione'), dataIndex: 'applicazione', minWidth: 150, width: 150, filter: { type: 'string' } },
    { text: Locale.t('nsm.grids.jobs.column.tipoServizio'), dataIndex: 'tipoServizio', minWidth: 150, width: 150, filter: { type: 'string' } },
    { text: Locale.t('nsm.grids.jobs.column.nome'), dataIndex: 'nome', flex: 1, minWidth: 150, filter: { type: 'string' } },
    {
      text: Locale.t('nsm.grids.jobs.column.descrizione'),
      dataIndex: 'descrizione',
      flex: 1,
      minWidth: 200,
      filter: { type: 'string' }
    },
    {
      text: Locale.t('nsm.grids.jobs.column.tipo'),
      dataIndex: 'tipo',
      width: 60,
      minWidth: 60,
      filter: { type: 'string' }
    },

    // {text: Locale.t('nsm.grids.jobs.column.interval'), dataIndex: 'interval', width: 140, filter: {type: 'string'}},
    // {text: Locale.t('nsm.grids.jobs.column.timeout'), dataIndex: 'timeout', width: 140, filter: {type: 'string'}},
    {
      text: Locale.t('nsm.grids.jobs.column.lastjob'),
      dataIndex: 'startJob',
      width: 180,
      minWidth: 180,
      xtype: 'datecolumn',
      format: 'd/m/Y H:i:s',
      filter: { type: 'date', dateFormat: 'c' } //Y-m-d
    },
    {
      text: Locale.t('nsm.grids.jobs.column.lastjobEnd'),
      dataIndex: 'stopJob',
      width: 180,
      minWidth: 180,
      xtype: 'datecolumn',
      format: 'd/m/Y H:i:s',
      filter: { type: 'date', dateFormat: 'c' } //Y-m-d
    },
  ],
  listeners: {
    itemdblclick: 'onitemdblclick',
    itemcontextmenu: 'onItemContextMenu',
    addFilterApp: 'onAddFilterApp'
  }
});

