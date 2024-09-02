/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ddt.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.ddt",
  requires: ["bofpub.view.grid.ddt.Store"],
  stores: {
    store: { type: "v1-bofpub-ddt", autoLoad: false },
  },
  data: {},
});
