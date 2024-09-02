/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define("stt.view.grids.obbiettivi.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "codice", type: "string" },
    { name: "nome", type: "string" },
  ],
});
