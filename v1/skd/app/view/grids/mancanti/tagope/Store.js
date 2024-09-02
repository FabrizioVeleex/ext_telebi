/**
 * Created by fabrizio on 12/02/22.
 */
Ext.define('skd.view.grids.mancanti.tagope.Store', {
  extend: 'Ext.data.Store',
  alias: "store.v1-skd-forms-mancanti-tagopestore",
  requires: ["Ext.data.proxy.Rest"],
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "forms/filters/getcombooperatore/",
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
  },
});