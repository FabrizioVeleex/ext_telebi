/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ntc.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.ntc",
  requires: ["bofpub.view.grid.ntc.Store"],
  stores: {
    store: { type: "v1-bofpub-ntc", autoLoad: false },
  },
  data: {},
});
