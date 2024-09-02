/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.previsione.model.ModelClienti", {
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
