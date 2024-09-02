
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.pak.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: [
    "spl.grids.pak.Controller",
    "spl.grids.pak.ViewModel"
  ],
  viewModel: "v1-spl-grids-pak",
  controller: "v1-spl-grids-pak",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'spl',
  selModel: {
    selType: "checkboxmodel",
    mode: "MULTI",
    checkOnly: true,
    showHeaderCheckbox: false,
    iconCls: "PAK-16",
    listeners: {
      // select: function (chk, rec) {
      //se non abilitato annullo la selezione
      //   if (rec.data.abilitato === 0) {
      //     chk.deselect(rec);
      //   }
      // },
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
