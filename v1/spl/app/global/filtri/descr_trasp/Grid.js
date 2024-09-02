/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('spl.global.filtri.descr_trasp.Grid', {
  extend: 'Ext.grid.Panel',
  hideHeaders: true,
  userCls: 'y-filtri-grid-white',
  height: 120,
  requires: [
    'Ext.grid.column.Action'
  ],
  viewConfig: {
    emptyText: Locale.t('global.grid.empty')
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
      items: [
        {
          getClass: function (v, meta, r) {
            meta.tdAttr = 'data-qtip=\"Rimuovi questo filtro:<br>' + r.data['descr_trasp'] + '\"';
            return 'icon-chiudi';
          },
          handler: 'filtri_onRemoveFilter'
        }
      ]
    },
    {
      dataIndex: 'descr_trasp',
      flex: 1,
      renderer: function (value, meta) {
        if (value) meta.tdAttr = 'data-qtip="' + value + '"';
        return value;
      }
    }
  ]
});