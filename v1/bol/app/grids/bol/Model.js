/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("bol.grids.bol.Model", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "string" },
    { name: "selectrow", type: "boolean", defaultValue: false },
    { name: "abilitato", type: "int" },
    { name: "cd_sogg_fat", type: "string", defaultValue: "" },
    { name: "creationdate", type: "date", dateFormat: "Y-m-d H:i:s" },
    { name: "data_doc", type: "date", dateFormat: "Y-m-d" },
    { name: "firma", type: "int", defaultValue: 0 },
    { name: "gruppo_num_dic", type: "string", defaultValue: "" },
    { name: "num_doc", type: "string", defaultValue: "" },
    { name: "rag_soc", type: "string", defaultValue: "" },
    { name: "status_mail", type: "int", defaultValue: -1 },
    { name: "tipo", type: "string", defaultValue: "" },
    { name: "tipo_doc", type: "string", defaultValue: "" },
    { name: "title", type: "string", defaultValue: "" },
    { name: "note", type: "string", defaultValue: "" },

    { name: "descr_trasp", type: "string", defaultValue: "" }, //trasportatore
  ],
});
