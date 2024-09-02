/**
 * Created by luca on 17/03/2017.
 */
Ext.define("recpub.view.form.resi.dettaglio.ModelArticoli", {
  extend: "Ext.data.Model",
  alias: "model.gridarticoli",
  //type: "gridarticoli",
  fields: [
    { name: "index", type: "int" },
    { name: "id", type: "string" },
    { name: "idrecord", type: "string" },
    { name: "idtestata", type: "string" },
    { name: "codcaus", type: "string" },
    { name: "causale", type: "string" },
    { name: "nrbos", type: "string" },
    { name: "dtbos", type: "date", dateFormat: "c" },
    { name: "cdars", type: "string" },
    { name: "depar", type: "string" },
    { name: "qta", type: "int" },
    { name: "pcdoc", type: "string" }
  ]
});
