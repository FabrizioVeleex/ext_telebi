/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.pak.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.pak",
  requires: ["bofpub.view.grid.pak.Store"],
  stores: {
    store: { type: "v1-bofpub-pak", autoLoad: false },
  },
  data: {},
});
