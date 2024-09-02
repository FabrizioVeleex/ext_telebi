/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.distinte.Grid', {
  extend: 'portal.v1.view.grids.DefaultGrid',
  requires: [
    'itm.grids.distinte.Controller',
    'itm.grids.distinte.ViewModel',
    'Ext.grid.plugin.DragDrop'
  ],
  viewModel: 'distinte',
  controller: 'distinte',
  bind: {
    store: '{store}',
    title: '{titolo}'
  },
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
  },
  columns: [],
  listeners: {
    columnresize: 'onResizeColumn',
    columnmove: 'onColumnMove',
    columnhide: 'onColumnhide',
    columnShow: 'onColumnshow',
    itemdblclick: 'onitemdblclick'
  }
});