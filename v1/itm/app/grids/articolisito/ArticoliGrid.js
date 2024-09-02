/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.articolisito.ArticoliGrid', {
  extend: 'portal.v1.view.grids.DefaultGrid',
  requires: [
    'itm.grids.articolisito.ArticoliController',
    'itm.grids.articolisito.ArticoliViewModel',
    'itm.grids.articolisito.ArticoliWidgetForm',
    'Ext.grid.plugin.RowWidget'
  ],
  viewModel: 'itm-v1-grid-articolisito',
  controller: 'itm-v1-grid-articolisito',
  bind: {
    store: '{store}',
    title: '{titolo}'
  },
  columns: [],
  plugins: [{
    ptype: 'rowwidget',
    id: 'widgetArticoliSito',
    onWidgetAttach: 'onWidgetAttachSito',
    widget: {
      xtype: 'container',
      itemId: 'widgetContainer'
    }
  },
  {
    ptype: 'gridfilters',
    menuFilterText: 'Filtri'
  }],
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    enableTextSelection: true,
    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true,
    listeners: {
      // expandbody: 'onExpandBody',
      // collapsebody: 'onCollapsebody'
    },
  },
  listeners: {
    columnresize: 'onResizeColumn',
    columnmove: 'onColumnMove',
    columnhide: 'onColumnhide',
    columnShow: 'onColumnshow',
    itemdblclick: 'onitemdblclick',
    addFilterStato: 'onAddFilterStato', // richiamato da treemenu filtro stato
    alterTitle: "onAlterTitle", // modifica titolo
    selectionchange: "onSelectionChange", // gestione visualizzazione anteprima
    activate: 'onActivateGrid' // gestione toggle show image
  }
});