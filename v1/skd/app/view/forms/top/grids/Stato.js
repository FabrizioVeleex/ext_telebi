/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.Stato', {
  extend: 'Ext.grid.Panel',
  height: 120,
  hideHeaders: true,
  requires: [
    'Ext.grid.column.Action'
  ],
  xtype: 'grid-filter-stato',
  viewConfig: {
    emptyText: Locale.t('skd.top.filtri.grids.stato.emptyText')
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
            meta.tdAttr = 'data-qtip=\"' + r.data['stato'] + ' (' + r.data['descrizione'] + '):<br>Rimuovi questo filtro\"';
            return 'icon-chiudi';
          },
          handler: 'onRemoveFilter'
        }
      ]
    },
    {
      text: 'stato',
      dataIndex: 'stato',
      flex: 1
    },
    {
      width: 28,
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
            if (r.data['io'] === 'in') {
              meta.tdAttr = 'data-qtip=\"<span style=\'color:green;\'>INCLUDI</span>\"';
              return 'fas fa-thumbs-up bd-color-green';
            }
            meta.tdAttr = 'data-qtip=\"<span style=\'color:red;\'>ESCLUDI</span>\"';
            return 'fas fa-thumbs-down bd-color-red';
          },
          handler: 'onChangeStatoFilter'
        }
      ]
    }
  ]
});