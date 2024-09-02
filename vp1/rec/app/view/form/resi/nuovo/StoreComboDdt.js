/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define("recpub.view.form.resi.nuovo.StoreComboDdt", {
  extend: "Ext.data.Store",
  alias: "store.comboStoreDdt",
  sorters: [
    {
      property: "dtbos",
      direction: "ASC",
    },
  ],
  fields: ["nrbos", "descr", "dtbos", "id"],
  proxy: {
    type: "rest",
    url: Backend.REST_API + "forms/resonew/loadddt/",
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
