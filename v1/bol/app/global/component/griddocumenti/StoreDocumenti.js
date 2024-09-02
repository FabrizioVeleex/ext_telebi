/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("bol.global.component.griddocumenti.StoreDocumenti", {
  extend: "Ext.data.Store",
  alias: "store.v1-global-component-griddocumenti",
  fields: [
    { name: "id", type: "string" },
    { name: "selectrow", type: "boolean", defaultValue: false },
    { name: "datadoc", type: "date", dateformat: "Y-m-d" },
    { name: "numero", type: "string" },
    { name: "trasportatore", type: "string" },
    { name: "codice", type: "string" },
    { name: "ragsoc", type: "string" },
  ],
});
