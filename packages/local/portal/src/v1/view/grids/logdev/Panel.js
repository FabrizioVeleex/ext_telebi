Ext.define('portal.v1.view.grids.logdev.Panel', {
  extend: 'portal.v1.view.grids.DefaultGrid',
  requires: [
    'Ext.container.Container',
    'Ext.grid.column.Date',
    'Ext.grid.plugin.RowWidget',
    'portal.v1.view.grids.logdev.Controller',
    'portal.v1.view.grids.logdev.Model'
  ],
  controller: 'logdev-v1',
  viewModel: 'logdev-v1',
  xtype: 'expander-lockable',
  flex: 1,
  iconCls: 'fas fa-bug bd-color-orange',
  viewConfig: {
    emptyText: Locale.t('global.logdev.emptytext'),
    enableTextSelection: true,
    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true,
    stripeRows: true
  },
  bind: {
    store: '{store}'
  },
  dockedItems: [
    {
      xtype: 'toolbar', dock: 'top',
      items: [
        {
          iconCls: 'fas fa-caret-square-left bd-color-green',
          handler: 'onClose'
        },
        {
          iconCls: 'fas pictos pictos-refresh',
          handler: 'reoladStore'
        }
      ]
    }
  ],
  plugins: {
    gridfilters: {
      menuFilterText: 'Filtri'
    },
    rowwidget: {
      widget: {
        xtype: 'container',
      },
      onWidgetAttach: function (plugin, bodyComponent, record) {
        let syntaxHighlight = function (json) {
          if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
          }
          json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          });
        }
        bodyComponent.removeAll()
        let value = (record.get('msg'))
        if (typeof (value) === 'object') {
          value = syntaxHighlight(value)
        }
        bodyComponent.add(
          {
            xtype: 'component',
            html: '<pre>' + value + '</pre>'
          });
      }

    }
  },
  columns: [
    {
      text: Locale.t('global.logdev.datalog'),
      dataIndex: 'datelog',
      width: 160,
      xtype: 'datecolumn',
      format: 'd/m/Y H:i:s',
      filter: { type: 'date', dateFormat: 'c' }
    },
    {
      text: Locale.t('global.logdev.type'),
      dataIndex: 'type',
      width: 50
    },
    {
      text: Locale.t('global.logdev.username'),
      dataIndex: 'username',
      width: 180,
      filter: { type: 'string' }
    },
    {
      text: Locale.t('global.logdev.file'),
      dataIndex: 'file',
      width: 250,
      filter: { type: 'string' }
    },
    {
      text: Locale.t('global.logdev.line'),
      dataIndex: 'line',
      width: 60
    },
    {
      text: Locale.t('global.logdev.msg'),
      dataIndex: 'msg',
      flex: 1,
      renderer: function (value, meta, record) {
        if (typeof (value) === 'object') {
          return '[json]'
        }
        return value
      }
    }
  ]
});