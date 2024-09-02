/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.cont.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.cont",
  requires: [
    'bofpub.view.grid.cont.Store'
  ],
  stores: {
    store: { type: "v1-bofpub-cont", autoLoad: false },
  },
  data: {}
});
