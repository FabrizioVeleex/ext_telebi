/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("itm.grids.articolisito.editSorting.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.itm-v1-grids-editsorting",

  requires: [
    "itm.grids.articolisito.editSorting.Store",
  ],
  stores: {
    gridAttributi: { type: "itm-v1-grids-editsorting-store" },
  },
  data: {
    insert2: true,
    disableReplace: true,
    txtFind: "",
    txtReplace: ""
  },
});