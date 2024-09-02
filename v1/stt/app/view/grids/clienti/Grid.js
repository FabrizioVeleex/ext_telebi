/**
 * Created by luca on 16/02/2017.
 */
Ext.define("stt.view.grids.clienti.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: ["stt.view.grids.clienti.Controller", "stt.view.grids.clienti.ViewModel"],
  viewModel: "stt-v1-grid-clienti",
  controller: "stt-v1-grid-clienti",
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
