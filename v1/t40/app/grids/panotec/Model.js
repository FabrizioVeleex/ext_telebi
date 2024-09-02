/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("t40.grids.panotec.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "_id", type: "string" },
    { name: "cdl", type: "string" },
    { name: "status", type: "int" },
    { name: "ordine_produzione", type: "string" },
    { name: "tag", type: "string" },
    { name: "data_creazione", type: "date", dateFormat: "Y-m-d H:i:s" },
    { name: "dati_ordine", type: "auto" },
    { name: "dati_produzione", type: "auto" },
    { name: "tot_qta", type: "string" }
  ],
});
