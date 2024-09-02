/**
 * Created by fabrizio on 23/02/2024.
 */
Ext.define("prd.global.cdl.cards.order.Model", {
  extend: "Ext.data.Model",

  requires: [
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json"
  ],
  fields: [
    { name: "id", type: "string" },
    { name: "displayStatus", type: "string", defaultValue: "N.D." },
    { name: 'startDate', type: 'date', dateFormat: 'c', defaultValue: '' },
    { name: "data", type: "auto" },
    { name: "type", type: "auto" },
  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "functions/getOrder/",
    reader: {
      type: "json",
      rootProperty: "data",
    },
    writer: {
      type: "json",
      writeAllFields: true,
    }
  },
});
