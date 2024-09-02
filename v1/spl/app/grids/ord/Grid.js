/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.ord.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["spl.grids.ord.Controller", "spl.grids.ord.ViewModel"],
  viewModel: "v1-grids-ord",
  controller: "v1-grids-ord",
  iconCls: "ORD-16",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'ord',
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
