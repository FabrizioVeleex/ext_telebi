/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.comboItems.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "cd_art", type: "string" },
    { name: "descr_art", type: "string" },
    { name: "cl_mer", type: "string" },
  ],
});
