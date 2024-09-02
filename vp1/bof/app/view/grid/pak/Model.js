/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.pak.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "data_doc", type: "date", dateFormat: "Y-m-d" },
    { name: "descrizione", type: "string" },
    { name: "num_doc", type: "string" },
    { name: "year", type: "number" }
  ]
});
