/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridGiacenze.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "cd_art", type: "string" },
    { name: "last_update", type: "date", dateFormat: "Y-m-d" },
    { name: "qta_giacenza", type: "int" },
    { name: "qta_evasa", type: "int" },
  ],
  data: [],
});
