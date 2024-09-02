/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("ord.grids.ord.component.age.StoreAge", {
  extend: "portal.v1.store.grids.Store",
  alias: "store.v1-grids-ord-age",
  fields: [
    'value'
  ],
  proxy: {
    url: Backend.REST_API + "grids/ord/getstoreage/",
    extraParams: {},
  },
});
