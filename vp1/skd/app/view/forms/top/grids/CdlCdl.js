/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.CdlCdl', {
  extend: 'Ext.grid.Panel',
  height: 120,
  hideHeaders: true,
  requires: [
    'Ext.grid.column.Action'
  ],
  xtype: 'grid-filter-cdl-cdl',
  viewConfig: {
    emptyText: Locale.t('skd.top.filtri.grids.cdl.emptyText')
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
            meta.tdAttr = 'data-qtip=\"' + r.data['ope_work_center_no'] + ':<br>Rimuovi questo filtro\"';
            return 'icon-chiudi';
          },
          handler: 'onRemoveFilter'
        }
      ]
    },
    {
      text: 'ope_work_center_no',
      dataIndex: 'ope_work_center_no',
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
          handler: 'onChangeCdlFilter'
        }
      ]
    }
  ]
});
