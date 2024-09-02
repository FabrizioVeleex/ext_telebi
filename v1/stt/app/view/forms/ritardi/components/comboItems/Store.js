/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.comboItems.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-form-ritardi-store-combo-items",
  requires: [
    "Ext.data.proxy.Rest",
    "stt.view.forms.ritardi.components.comboItems.Model"
  ],
  model: "stt.view.forms.ritardi.components.comboItems.Model",
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "getitems/",
    extraParams: { id: "" },
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
  },
});
