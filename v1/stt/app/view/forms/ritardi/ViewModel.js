/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.ritardi.ViewModel", {
  extend: "portal.v1.view.forms.singleForm.Model",
  alias: "viewmodel.v1-stt-ritardi",
  requires: [
    "portal.v1.store.forms.combo.GetCompanies",

    "stt.view.forms.ritardi.components.gridAndamento.Store",
    "stt.view.forms.ritardi.components.gridOrdiniInevasi.Store",
    "stt.view.forms.ritardi.components.gridDdt.Store",
    "stt.view.forms.ritardi.components.gridDdt.Store",
    "stt.view.forms.ritardi.components.gridOrdine.Store",
    "stt.view.forms.ritardi.components.comboItems.Store",
    "stt.view.forms.ritardi.components.comboClasseMerceologica.Store",
    "stt.view.forms.ritardi.components.gridSituazioneOrdiniRighe.Store",
    "stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Store"
  ],
  stores: {
    storeSoggetti: { type: "v1-getcompanies" }, //store soggetto
    storeItems: { type: "stt-v1-form-ritardi-store-combo-items" }, //store articoli
    storeClasseMerceologica: { type: "stt-v1-form-ritardi-combo-classemerceologica" }, //store classe merceologica
    storeOrdine: { type: "stt-v1-form-ritardi-storeordine", autoLoad: false }, //store movimenti in uscita
    storeDdt: { type: "stt-v1-ritardi-storeddt", autoLoad: false }, //store movimenti in uscita
    storeGiacenze: { type: "stt-v1-form-ritardi-storegiacenze", autoLoad: false }, //store giacenze magazzini
    storeOrdiniInevasi: { type: "stt-v1-form-ritardi-storeordiniinevasi", autoLoad: false }, //store lista ordini inevasi
    storeAndamento: { type: "stt-v1-form-ritardi-storeandamento" }, //store andamento resi

    storeOrdiniRighe: { type: "stt-ritardi-store-ordini-righe", autoLoad: true }, //store situazione ordini righe
    storeOrdiniTestate: { type: "stt-ritardi-store-ordini-testate", autoLoad: true }, //store situazione ordini testate
  },
  data: {
    inMonth: {
      prev: false,
      next: false,
      in: false
    },
    totals: "",
    periodo: "Y",
    totOrdine: 0,
    totConsegnato: 0,
    totInevaso: 0,
    totOrdini: 0,
    totConsegnati: 0,
    totInevasi: 0,
  },
});
