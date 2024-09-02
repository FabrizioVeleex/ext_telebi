/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.Model", {
  extend: "Ext.data.Model",

  requires: [
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json"
  ],
  fields: [
    { name: "isnew", type: "boolean", defaultValue: 0 },
    { name: "id", type: "string" },
    { name: "agente_fatt", type: "string" }, //FIXME
    { name: "data_doc", type: "date", dateFormat: "c" },
    { name: "ente", type: "string" },
    { name: "firma", type: "int", defaultValue: 0 },
    { name: "mailto", type: "auto" },
    { name: "note", type: "string" },
    { name: "cd_sogg_fatt", type: "string" },
    { name: "rag_soc", type: "string" },
    { name: "stabilimento", type: "int", defaultValue: 0 },
    { name: "status_mail", type: "int", defaultValue: -1 },
    { name: "tipo_sogg", type: "string" },
    { name: "tipo_spool", type: "string" },
    { name: "id_sogg_fatt", type: "string" },
    { name: "num_doc", type: "string" },
    { name: "gruppo_num_doc", type: "string" },

  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/processo/",
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
