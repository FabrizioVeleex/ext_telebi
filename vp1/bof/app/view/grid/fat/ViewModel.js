/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.fat.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.fat",
  requires: ["bofpub.view.grid.fat.Store"],
  stores: {
    store: { type: "v1-bofpub-fat", autoLoad: false },
  },
  data: {},
});
