/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("ord.global.component.combostampante.StoreStampante", {
  extend: "Ext.data.Store",
  alias: "store.v1-global-firma-comboStampanti",
  requires: ["Ext.data.proxy.Rest"],
  fields: ["id", "descrizione", "stampante"],
  listeners: {
    beforeload: function (store) {
      if (store.isLoading()) return false;
    },
  },
  autoload: true,
  proxy: {
    type: "ajax",
    pageParam: false,
    startParam: false,
    limitParam: false,
    url: Backend.REST_API + "global/getstampanti/",
    appendId: false,
    reader: {
      type: "json",
      rootProperty: "data",
    },
  },
});
