/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.forms.tipologia.Model", {
  extend: "Ext.data.Model",

  requires: [
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json"
  ],
  fields: [
    { name: "isnew", type: "boolean", defaultValue: 0 },
    { name: "id", type: "string" },
    { name: "cd_art", type: "string" }, //FIXME
    // { name: "data_doc", type: "date", dateFormat: "c" },
    // { name: "ente", type: "string" },
    // { name: "firma", type: "int", defaultValue: 0 },
    // { name: "mailto", type: "auto" },
    // { name: "spool", type: "boolean", defaultValue: 1 },
    // { name: "imported", type: "boolean", defaultValue: 1 },
    // { name: "mailto", type: "auto" },
    // { name: "note", type: "string", defaultValue: "" },
    // { name: "rag_soc", type: "string", defaultValue: "" },
    // { name: "stabilimento", type: "int", defaultValue: 0 },
    // { name: "status_mail", type: "int", defaultValue: -1 },
    // { name: "tipo_sogg", type: "string", defaultValue: "" },
    // { name: "tipo_spool", type: "string", defaultValue: "" },
    // { name: "id_sogg_fatt", type: "string", defaultValue: "" },
    // { name: "num_doc", type: "string", defaultValue: "" },
    // { name: "gruppo_num_doc", type: "string", defaultValue: "" },

  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/tipologia/",
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
