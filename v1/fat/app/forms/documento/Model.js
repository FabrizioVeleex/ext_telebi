/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("fat.forms.documento.Model", {
  extend: "Ext.data.Model",

  requires: [
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json"
  ],
  fields: [
    { name: "isnew", type: "boolean", defaultValue: 0 },
    { name: "id", type: "string" },
    // { name: "agente_fatt", type: "string" }, //FIXME
    { name: "data_doc", type: "date", dateFormat: "c" },
    // { name: "ente", type: "string" }, //FIXME
    { name: "firma", type: "int", defaultValue: 0 },
    { name: "mailto", type: "auto" },
    { name: "note", type: "string", defaultValue: "" },
    { name: "cd_sogg_fatt", type: "string", defaultValue: "" },
    // { name: "rag_soc", type: "string", defaultValue: "" }, //FIXME
    { name: "stabilimento", type: "int", defaultValue: 0 },
    { name: "status_mail", type: "int", defaultValue: -1 },
    { name: "tipo_sogg", type: "string", defaultValue: "" },
    { name: "tipo_spool", type: "string", defaultValue: "" },
    { name: "id_sogg_fatt", type: "string", defaultValue: "" },
    { name: "num_doc", type: "string", defaultValue: "" },
    { name: "gruppo_num_doc", type: "string", defaultValue: "" },

  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/documento/",
    reader: {
      type: "json",
      rootProperty: "data",
    },
    writer: {
      type: "json",
      writeAllFields: true,
    },
  },
});
