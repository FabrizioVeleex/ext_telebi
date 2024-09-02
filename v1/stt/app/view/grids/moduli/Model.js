/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.grids.moduli.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "codice", type: "string" },
    { name: "nome", type: "string" },
  ],
});
