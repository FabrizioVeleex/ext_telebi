/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.grids.moduli.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["stt.view.grids.moduli.Controller", "stt.view.grids.moduli.ViewModel"],
  viewModel: "moduli",
  controller: "moduli",
  bind: {
    store: "{store}",
    title: "{titolo}",
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
