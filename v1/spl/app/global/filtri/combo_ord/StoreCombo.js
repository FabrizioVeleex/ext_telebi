/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('spl.global.filtri.combo_ord.StoreCombo', {
  extend: 'Ext.data.Store',
  alias: "store.v1-spl-global-filtri-comboord",
  requires: [
    'Ext.data.proxy.Rest'
  ],
  fields: [
    { name: 'tipo_doc', type: 'string' },
  ],
  data: [
    { id: "X", name: "Nessun filtro" },
    { id: "C", name: Locale.t("spl.grids.documenti.ord.c") },
    { id: "R", name: Locale.t("spl.grids.documenti.ord.r") },
  ],
  proxy: {
    type: 'memory',
    reader: { type: 'json', rootProperty: 'data' }
  }
});
