/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridDdt.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-ritardi-storeddt",
  requires: ["stt.view.forms.ritardi.components.gridDdt.Model"],
  model: "stt.view.forms.ritardi.components.gridDdt.Model",
});
