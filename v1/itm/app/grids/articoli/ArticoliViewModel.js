/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articoli.ArticoliViewModel', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.itm-v1-grid-articoli',
  requires: [
    'itm.grids.articoli.ArticoliStore',
    'itm.grids.components.filtri.ComboStoreClasse',
    'itm.grids.components.filtri.ComboStoreFamiglie',
    "itm.grids.components.filtri.ComboStoreGruppi",
    "itm.grids.components.filtri.ComboStoreSottoGruppi",
    "itm.grids.components.filtri.ComboStoreMarche"
  ],
  stores: {
    store: { type: 'itm-v1-store-articoli', autoLoad: false },
    storeFiltriClasse: { type: 'itm.v1-filtri-comboclasse', autoLoad: false },
    storeFiltriFamiglie: { type: 'itm.v1-filtri-combofamiglie', autoLoad: false },
    storeFiltriGruppi: { type: 'itm.v1-filtri-combogruppi', autoLoad: false },
    storeFiltriSottoGruppi: { type: 'itm.v1-filtri-combosottogruppi', autoLoad: false },
    storeFiltriMarche: { type: 'itm.v1-filtri-combomarche', autoLoad: false },
  },
  data: {
    textBtnImageShow: '',
    titolo: Locale.t('itm.grids.articoli.title'),
    filtri: {
      id_clm: [],
      id_fam: [],
      id_gruppi: [],
      id_sottogruppi: [],
      id_marche: []
    }
  }
});