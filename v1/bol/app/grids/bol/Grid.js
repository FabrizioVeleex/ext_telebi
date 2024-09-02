
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("bol.grids.bol.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: [
    "bol.grids.bol.Controller",
    "bol.grids.bol.ViewModel"
  ],
  viewModel: "v1-bol-grids-bol",
  controller: "v1-bol-grids-bol",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'bol',
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
