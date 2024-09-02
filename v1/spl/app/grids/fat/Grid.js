/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.fat.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["spl.grids.fat.Controller", "spl.grids.fat.ViewModel"],
  viewModel: "v1-grids-fat",
  controller: "v1-grids-fat",
  iconCls: "FAT-16",
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
