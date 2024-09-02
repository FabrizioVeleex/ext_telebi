
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("bol.grids.bol.component.trasp.StoreTrasp", {
  extend: "portal.v1.store.grids.Store",
  alias: "store.v1-grids-bol-trasp",
  fields: [
    'value'
  ],
  proxy: {
    url: Backend.REST_API + "grids/bol/getstoretrasp/",
    extraParams: {},
  },
});
