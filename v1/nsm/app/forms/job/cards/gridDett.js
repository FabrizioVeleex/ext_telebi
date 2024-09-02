/**
 * Created by fabrizio on 09/03/21.
 */
Ext.define('nsm.view.forms.job.cards.gridDett', {
  extend: 'Ext.grid.GridPanel',
  requires: [
    'Ext.container.Container',
    'Ext.grid.plugin.RowWidget',
    'Ext.grid.column.Action',
    'Ext.grid.column.Date'
  ],
  forceFit: true,
  autoLoad: false,
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    enableTextSelection: true,
    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true
  },
  bind: {
    store: '{gridDett}',
    title: '{titolo}'
  },
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
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' },
        {
          xtype: 'container',
          bind: {
            html: '{titoloDett}'
          }
        }
      ]
    }
  ],
  columns: [
    {
      xtype: 'actioncolumn',
      sortable: false,
      width: 30,
      minWidth: 30,
      menuDisabled: true,
      resizable: false,
      items: [
        {
          getClass: function (view, meta, record) {
            if (record.get('esito') === 2) {
              return "bd-action-null x-fas fa-exclamation-triangle bd-color-orange";
            }
            if (record.get('esito') === 3) {
              return "bd-action-null x-fas fa-exclamation-circle bd-color-red";
            }
            return "";
          }
        }]
    },
    {
      text: Locale.t('nsm.forms.job.cards.griddett.column.esito'),
      sortable: false,
      dataIndex: 'esito',
      width: 100,
      minWidth: 100,
      renderer: function (value, meta) {
        if (value === 1) {
          meta.tdCls = ' column-color-green'; return Locale.t('nsm.forms.job.cards.gridlog.esito.ok');
        }
        if (value === 2) {
          meta.tdCls = ' column-color-orange'; return Locale.t('nsm.forms.job.cards.gridlog.esito.warning');
        }
        if (value === 3) {
          meta.tdCls = ' column-color-red'; return Locale.t('nsm.forms.job.cards.gridlog.esito.error');
        }
        meta.tdCls = ' column-color-green'; return '[n.d.]';
      },
      filter: { type: 'string' }
    },
    {
      text: Locale.t('nsm.forms.job.cards.griddett.column.data'),
      sortable: false,
      dataIndex: 'data',
      width: 100,
      minWidth: 100,
      xtype: 'datecolumn',
      format: 'H:i:s',
    },
    {
      text: Locale.t('nsm.forms.job.cards.griddett.column.msg'),
      sortable: false,
      dataIndex: 'msg',
      flex: 1,
      minWidth: 200,
      tdCls: 'dettgrid-multiline',
      renderer: function (value, meta, record) {
        if (typeof (value) === 'object') {
          return '[json]'
        }
        return value
      }
    },

  ]
});