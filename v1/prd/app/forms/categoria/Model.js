/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.forms.categoria.Model", {
  extend: "Ext.data.Model",

  requires: [
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json"
  ],
  fields: [
    { name: "isnew", type: "boolean", defaultValue: 0 },
    { name: "id", type: "string" },
    { name: "cd_cat", type: "string" },
    { name: "descr_cat", type: "string" },
  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/categoria/",
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
