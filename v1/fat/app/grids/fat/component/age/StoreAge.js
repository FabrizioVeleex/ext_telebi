/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("fat.grids.fat.component.age.StoreAge", {
  extend: "portal.v1.store.grids.Store",
  alias: "store.v1-grids-fat-age",
  fields: [
    'value'
  ],
  proxy: {
    url: Backend.REST_API + "grids/fat/getstoreage/",
    extraParams: {},
  },
});
