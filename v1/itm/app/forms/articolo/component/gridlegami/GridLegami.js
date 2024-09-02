/**
 * Created by fabrizio on 12/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridlegami.GridLegami', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'Ext.grid.plugin.CellEditing',
    'portal.util.Functions'
  ],
  title: Locale.t('itm.forms.articolo.gridlegami.title'),
  minHeight: 100,
  bind: {
    store: '{storeLegami}',
  },
  selType: 'cellmodel',
  // plugins: {
  //     ptype: 'cellediting',
  //     clicksToEdit: 1,
  // },
  scrollable: 'y',
  // viewConfig: {
  //   emptyText: Locale.t('global.grid.empty'),
  //   getRowClass: function (record) {
  //     return (record.get('action') === 2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
  //   }
  // },
  columns: [
    {
      xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
      items: [{ handler: 'onOpenFiglio', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
    },
    {
      text: Locale.t('itm.forms.articolo.gridlegami.column.cd_art'), dataIndex: 'cd_art', minWidth: 200, width: 200
    },
    {
      text: Locale.t('itm.forms.articolo.gridlegami.column.descr_art'), dataIndex: 'descr_art', minWidth: 500, flex: 1
    }
  ]
});