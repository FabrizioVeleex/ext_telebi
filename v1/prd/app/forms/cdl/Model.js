/**
 * Created by fabrizio on 23/02/2024.
 */

Ext.define("prd.forms.cdl.Model", {
  extend: "prd.global.cdl.Model",
  requires: [
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json"
  ],
  fields: [
    { name: "id", type: "string" },
  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/cdl/getConfig/",
    reader: {
      type: "json",
      rootProperty: "data",
    },
    writer: {
      type: 'json',
      writeAllFields: true,
    }
  },

});




