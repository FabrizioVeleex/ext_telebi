/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.grids.progetti.Grid', {
  extend: 'portal.v1.view.grids.DefaultGrid',
  requires: [
    'atp.grids.progetti.Controller',
    'atp.grids.progetti.ViewModel'
  ],
  viewModel: 'v1-atp-grid-progetti',
  controller: 'v1-atp-grid-progetti',
  bind: {
    store: '{store}',
    title: '{titolo}'
  },
  selModel: {
    selType: "checkboxmodel",
    mode: "MULTI",
    checkOnly: true,
    showHeaderCheckbox: false,
    // listeners: {
    //   select: function (chk, rec) {
    //     //se non abilitato annullo la selezione
    //     if (rec.data.abilitato === 0) {
    //       chk.deselect(rec);
    //     }
    //   },
    // },
  },
  columns: [],
  listeners: {
    itemdblclick: 'onitemdblclick',
    columnresize: 'onResizeColumn',
    columnmove: 'onColumnMove',
    columnhide: 'onColumnhide',
    columnShow: 'onColumnshow'
  }
});