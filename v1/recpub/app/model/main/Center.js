/**
 * Created by fabrizio on 15/05/17.
 */
Ext.define("recpub.model.main.Center", {
  extend: "Ext.data.Model",

  requires: ["Ext.data.proxy.Rest", "Ext.data.reader.Json", "Ext.data.writer.Json"],

  fields: [
    { name: "id", type: "string" },
    { name: "datadoc", type: "string" },
    { name: "datestop", type: "string" },
    { name: "subject", type: "string" },
    { name: "docs" },
    { name: "status", type: "int" },
    { name: "titolo", type: "string" },
    { name: "url", type: "string" },
    { name: "inviato", type: "string" },
    { name: "modulo", type: "string" },
    { name: "infoclose", type: "string" },
    { name: "escluso", type: "int" },
  ],

  proxy: {
    type: "rest",
    url: Backend.API_ADDRESS + "Main.php",
    extraParams: { _fn: "getToken" },
    appendId: false,
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
