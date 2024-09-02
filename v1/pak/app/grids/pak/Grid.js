
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("pak.grids.pak.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: [
    "pak.grids.pak.Controller",
    "pak.grids.pak.ViewModel"
  ],
  viewModel: "v1-pak-grids-pak",
  controller: "v1-pak-grids-pak",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'pak',
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
