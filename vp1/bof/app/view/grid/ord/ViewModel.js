/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ord.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.ord",
  requires: [
    "bofpub.view.grid.ord.Store",
    'bofpub.view.grid.ord.dettaglio.StoreDettaglio'
  ],
  stores: {
    store: { type: "v1-bofpub-ord", autoLoad: false },
    storeDettaglio: {type:"v1-bof-ord-dettaglio",autoload:false}
  },
  data: {}
});
