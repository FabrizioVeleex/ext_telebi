/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.comboClasseMerceologica.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-form-ritardi-combo-classemerceologica",
  requires: [
    "Ext.data.proxy.Rest",
    "stt.view.forms.ritardi.components.comboClasseMerceologica.Model"
  ],
  model: "stt.view.forms.ritardi.components.comboClasseMerceologica.Model",
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "getclassemerceologica/",
    extraParams: { codclasmer: "" },
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
  },
});
