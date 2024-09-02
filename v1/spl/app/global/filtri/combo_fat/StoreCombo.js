/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('spl.global.filtri.combo_fat.StoreCombo', {
  extend: 'Ext.data.Store',
  alias: "store.v1-spl-global-filtri-combofat",
  requires: [
    'Ext.data.proxy.Rest'
  ],
  fields: [
    { name: 'tipo_doc', type: 'string' },
  ],
  data: [
    { id: "X", name: "Nessun filtro" },
    { id: "F", name: Locale.t("spl.grids.documenti.fat.f") },
    { id: "N", name: Locale.t("spl.grids.documenti.fat.n") },
    { id: "P", name: Locale.t("spl.grids.documenti.fat.p") },
  ],
  proxy: {
    type: 'memory',
    reader: { type: 'json', rootProperty: 'data' }
  }
});
