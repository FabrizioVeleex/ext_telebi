/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridAndamento.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "num_doc", type: "string" },
    { name: "data_doc", type: "date", dateFormat: "Y-m-d" },
    { name: "cd_sogg_fat", type: "string" },
    { name: "rag_soc", type: "string" },
    { name: "cd_art", type: "string" },
    { name: "descr_art", type: "string" },
    { name: "data_cons_conf", type: "date", dateFormat: "Y-m-d" },
    { name: "qta_ord", type: "int" },
    { name: "qta_cons", type: "int" },
  ],
});
