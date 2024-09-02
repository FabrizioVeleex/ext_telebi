/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.gridOrdine.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "num_riga", type: "int" },
    { name: "cl_mer", type: "string" },
    { name: "cd_art", type: "string" },
    { name: "descrizione", type: "string" },
    { name: "qta_ord", type: "int" },
    { name: "qta_cons", type: "int" },
  ],
  data: [],
});
