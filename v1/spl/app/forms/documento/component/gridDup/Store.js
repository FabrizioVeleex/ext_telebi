/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("spl.forms.documento.component.gridDup.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-spl-forms-documento-griddup",
  fields: [
    { name: "index", type: "int" },
    { name: "id", type: "string" },
    { name: "idrecord", type: "string" },
    { name: "creationdate", type: "date", dateFormat: "c" },
  ],
  data: [],
  proxy: {
    type: "ajax",
    simpleSortMode: true,
    url: Backend.REST_API + "forms/documento/getdup/",
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
  },
});
