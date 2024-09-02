/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.cont.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "datae4", type: "date", dateFormat: "Y-m-d" },
    { name: "dadoc4", type: "date", dateFormat: "Y-m-d" },
    { name: "dasca4", type: "date", dateFormat: "Y-m-d" },
    { name: "nurif4", type: "string" },
    { name: "esito4", type: "string" },
    { name: "aarif4", type: "number" },
    { name: "impre4", type: "number" }
  ]
});
