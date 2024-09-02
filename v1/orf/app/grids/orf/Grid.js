/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("orf.grids.orf.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["orf.grids.orf.Controller", "orf.grids.orf.ViewModel"],
  viewModel: "v1-grids-orf",
  controller: "v1-grids-orf",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'fat',
  selModel: {
    selType: "checkboxmodel",
    mode: "MULTI",
    checkOnly: true,
    showHeaderCheckbox: false,
    listeners: {
      select: function (chk, rec) {
        //se non abilitato annullo la selezione
        if (rec.data.abilitato === 0) {
          chk.deselect(rec);
        }
      },
    },
  },
  columns: [],
  listeners: {
    columnresize: "onResizeColumn",
    columnmove: "onColumnMove",
    columnhide: "onColumnhide",
    columnShow: "onColumnshow",
    itemdblclick: "onitemdblclick",
  },
});
