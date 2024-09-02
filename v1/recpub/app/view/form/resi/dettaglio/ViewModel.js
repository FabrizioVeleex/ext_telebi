/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define("recpub.view.form.resi.dettaglio.ViewModel", {
  extend: "Ext.data.Model",
  alias: "model-dettaglio",

  requires: ["Ext.data.proxy.Rest", "Ext.data.reader.Json", "Ext.data.writer.Json"],
  fields: [],
  proxy: {
    autoload: false,
    type: "rest",
    url: Backend.REST_API + "forms/dettaglio/get/",
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
