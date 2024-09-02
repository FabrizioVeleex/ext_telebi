/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridOrdiniInevasi.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-form-ritardi-storeordiniinevasi",
  requires: ["stt.view.forms.ritardi.components.gridOrdiniInevasi.Model"],
  model: "stt.view.forms.ritardi.components.gridOrdiniInevasi.Model",
});
