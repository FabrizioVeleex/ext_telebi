/**
 * Created by luca on 17/03/2017.
 */
Ext.define("recpub.view.form.resi.dettaglio.ModelArticoli", {
  extend: "Ext.data.Model",
  alias: "model.gridarticoli",

  requires: ["Ext.data.proxy.Rest", "Ext.data.reader.Json", "Ext.data.writer.Json"],
  type: "gridarticoli",
  fields: [
    { name: "index", type: "int" },
    { name: "id", type: "string" },
    { name: "idrecord", type: "string" },
    { name: "idtestata", type: "string" },
    { name: "codcaus", type: "string" },
    { name: "causale", type: "string" },
    { name: "nrbos", type: "string" },
    { name: "dtbos", type: "date", dateFormat: "Y-m-d" },
    { name: "cdars", type: "string" },
    { name: "depar", type: "string" },
    { name: "qta", type: "int" },
    { name: "pcdoc", type: "string" },
  ],
  proxy: {
    type: "rest",
    simpleSortMode: true,
    extraParams: {},
    url: Backend.REST_API + "forms/dettaglio/getarticoli/",
    reader: { type: "json", rootProperty: "data" },
    writer: {
      type: "json",
      writeAllFields: true,
    },
  },
});
