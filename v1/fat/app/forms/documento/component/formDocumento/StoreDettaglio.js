/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("fat.forms.documento.component.formDocumento.StoreDettaglio", {
  extend: "Ext.data.Store",
  alias: "store.v1-fat-forms-documento-griddettaglio",
  fields: [
    { name: "id", type: "string" },
    { name: "cd_art", type: "string" },
    { name: "commento", type: "string" },
    { name: "qta", type: "number" },
    { name: "num_riga", type: "number" },
    { name: "num_ord", type: "string" },
    { name: "importo_riga", type: "string" },
    { name: "importo_tot", type: "string" },
    { name: "num_ddt", type: "string" },
  ],
  data: [],
});
