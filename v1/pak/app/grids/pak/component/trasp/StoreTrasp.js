
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("pak.grids.pak.component.trasp.StoreTrasp", {
  extend: "portal.v1.store.grids.Store",
  alias: "store.v1-grids-pak-trasp",
  fields: [
    'value'
  ],
  proxy: {
    url: Backend.REST_API + "grids/pak/getstoretrasp/",
    extraParams: {},
  },
});
