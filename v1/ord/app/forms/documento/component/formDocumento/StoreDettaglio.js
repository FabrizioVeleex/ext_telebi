/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("ord.forms.documento.component.formDocumento.StoreDettaglio", {
  extend: "Ext.data.Store",
  alias: "store.v1-ord-forms-documento-griddettaglio",
  fields: [
    { name: "id", type: "string" },
    { name: "cd_art", type: "string" },
    { name: "commento", type: "string" },
    { name: "qta", type: "number" },
    { name: "num_riga", type: "number" },
    { name: "um", type: "string" },
  ],
  data: [],
});
