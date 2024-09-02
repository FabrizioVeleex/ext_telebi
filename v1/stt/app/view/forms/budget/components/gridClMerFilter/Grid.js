/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('stt.view.forms.budget.components.gridClMerFilter.Grid', {
  extend: 'Ext.grid.Panel',
  height: 120,
  hideHeaders: true,
  scrollable: 'y',
  requires: [
    'Ext.grid.column.Action'
  ],
  xtype: 'stt-v1-form-analisi-grid-filter-clmer',
  viewConfig: {
    emptyText: Locale.t('stt.forms.budget.analisi.filtri.form.clmer.emptyGrid')
  },
  columns: [
    {
      width: 25,
      align: 'center',
      sortable: false,
      hideable: false,
      menuDisabled: true,
      draggable: false,
      groupable: false,
      xtype: 'actioncolumn',
      cls: 'stt-row-xx-small',
      items: [
        {
          getClass: function (v, meta, r) {
            meta.tdAttr = 'data-qtip=\"' + r.data['cd_clm'] + '-' + r.data['descr_clm'] + '\"';
            return 'icon-chiudi';
          },
          handler: 'onRemoveFilterClMer'
        }
      ]
    },
    {
      cls: 'goma-row-xx-small',
      text: 'cd_clm',
      dataIndex: 'cd_clm',
      flex: 1
    },
  ]
});