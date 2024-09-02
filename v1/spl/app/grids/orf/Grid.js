/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.orf.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["spl.grids.orf.Controller", "spl.grids.orf.ViewModel"],
  viewModel: "v1-grids-orf",
  controller: "v1-grids-orf",
  iconCls: "ORF-16",
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  itemId: 'orf',
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
