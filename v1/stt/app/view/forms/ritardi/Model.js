/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.ritardi.Model", {
  extend: "Ext.data.Model",

  requires: ["Ext.data.proxy.Rest", "Ext.data.reader.Json", "Ext.data.writer.Json"],
  fields: [
    { name: "action", defaultValue: 0 }, //0:none,1:update(new),2:delete
    { name: "isnew", defaultValue: 0 }, //0 = false, 1 true
    { name: "id", defaultValue: "" },
    { name: "idmodulo", defaultValue: "" },
    { name: "iduser", defaultValue: "" },
    { name: "nomefile", defaultValue: "" },
  ],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/ritadi/",
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
