/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridOrdine.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-form-ritardi-storeordine",
  requires: ["stt.view.forms.ritardi.components.gridOrdine.Model"],
  model: "stt.view.forms.ritardi.components.gridOrdine.Model",
});
