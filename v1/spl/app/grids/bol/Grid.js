/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.bol.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: [
    "spl.grids.bol.Controller",
    "spl.grids.bol.ViewModel"
  ],
  viewModel: "v1-spl-grids-bol",
  controller: "v1-spl-grids-bol",
  iconCls: "BOL-16",
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
