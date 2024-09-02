/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("ord.grids.ord.ViewModel", {
  extend: "portal.v1.view.grids.DefaultModel",
  alias: "viewmodel.v1-grids-ord",

  requires: [
    "ord.grids.ord.Store",
    'ord.grids.ord.component.age.StoreAge',
    'portal.v1.store.forms.combo.GetAzienda'
  ],
  stores: {
    store: { type: "v1-grids-ord", autoLoad: false },
    storeAge: { type: "v1-grids-ord-age", autoLoad: false },
    storeAzienda:{type:'v1-getazienda', autoLoad: false }
  },
  data: {
    titolo: Locale.t("ord.grids.documenti.ord.title"), //titolo vista
  },
});
