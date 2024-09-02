/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridDdt.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "cd_sogg_fat", type: "string" },
    { name: "cd_naz", type: "string" },
    { name: "data_doc", type: "date", dateFormat: "Y-m-d" },
    { name: "descr_art", type: "string" },
    { name: "num_doc", type: "string" },
    { name: "qta", type: "int" },
    { name: "rag_soc", type: "string" },
  ],
  data: [],
});
