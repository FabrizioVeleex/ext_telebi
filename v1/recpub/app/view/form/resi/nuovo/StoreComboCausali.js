/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define("recpub.view.form.resi.nuovo.StoreComboCausali", {
  extend: "Ext.data.Store",
  alias: "store.comboStoreCausali",
  sorters: [
    {
      property: "psdesc",
      direction: "ASC",
    },
  ],
  fields: ["giorni", "pscaus", "psdesc"],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/resonew/loadcausali/",
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
