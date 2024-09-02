/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridGiacenze.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-v1-form-ritardi-storegiacenze",
  requires: ["stt.view.forms.ritardi.components.gridGiacenze.Model"],
  model: "stt.view.forms.ritardi.components.gridGiacenze.Model",
});
