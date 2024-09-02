/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define("recpub.view.form.resi.nuovo.ModelReso", {
  extend: "Ext.data.Model",
  alias: "model-newreso",
  fields: [],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/resonew/loadnew/",
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
