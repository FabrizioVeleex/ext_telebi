/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("t40.grids.panotec.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["t40.grids.panotec.Controller", "t40.grids.panotec.ViewModel"],
  viewModel: "v1-grids-panotec",
  controller: "v1-grids-panotec",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'panotec',
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
