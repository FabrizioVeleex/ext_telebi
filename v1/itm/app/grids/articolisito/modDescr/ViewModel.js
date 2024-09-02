/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define("itm.grids.articolisito.modDescr.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.itm-v1-grids-moddescr",

  requires: [
    "itm.grids.articolisito.modDescr.StoreModDescr",
  ],
  stores: {
    gridArticoli: { type: "itm-v1-grids-moddescr-store" },
  },
  data: {
    disableReplace: true,
    txtFind: "",
    txtReplace: ""
  },
});