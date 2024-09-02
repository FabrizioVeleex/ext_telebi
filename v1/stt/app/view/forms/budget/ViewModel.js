/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.ViewModel", {
  extend: 'portal.v1.view.forms.mainCard.Model',
  alias: "viewmodel.v1-stt-form-budget",
  requires: [
    "stt.view.forms.budget.components.gridClMer.Store",
    "stt.view.forms.budget.components.gridNazionalita.Store",
    "stt.view.forms.budget.components.gridRegioni.Store",
    "stt.view.forms.budget.components.gridNazioni.Store",
    "stt.view.forms.budget.components.gridClienti.Store",
    "stt.view.forms.budget.components.gridArticoli.Store",
    "stt.view.forms.budget.components.gridArticoliDettaglio.Store",

    "stt.view.forms.budget.components.comboClMer.Store",
    "stt.view.forms.budget.components.gridClMerFilter.Store",
    "stt.view.forms.budget.components.comboNazioni.Store",
    "stt.view.forms.budget.components.comboRegioni.Store",
    "stt.view.forms.budget.components.comboClienti.Store",
    "stt.view.forms.budget.components.comboFamiglie.Store",
  ],
  stores: {
    storeClMer: { type: "stt-v1-analisi-storeclmer" },
    storeNazionalita: { type: "stt-v1-analisi-storenazionalita" },
    storeNazioni: { type: "stt-v1-analisi-storenazioni" },
    storeRegioni: { type: "stt-v1-analisi-storeregioni" },
    storeClienti: { type: "stt-v1-analisi-storeclienti" },
    storeArticoli: { type: "stt-v1-analisi-storearticoli" },
    storeArticoliDettaglio: { type: "stt-v1-analisi-storearticolidettaglio" },

    storeFiltriComboClMer: { type: "stt-v1-form-analisi-storecomboclmer" },
    storeFiltriComboNazioni: { type: "stt-v1-form-analisi-storecombonazioni" },
    storeFiltriComboRegioni: { type: "stt-v1-form-analisi-storecomboregioni" },
    storeFiltriComboClienti: { type: "stt-v1-form-analisi-storecomboclienti" },
    storeFiltriComboFamiglie: { type: "stt-v1-form-analisi-storecombofamiglie" },

    storeFilterGridClMer: { type: "stt-v1-form-analisi-storefiltrigridclmer" },

  },
  data: {
    cardactive: 'analisi',
    hidecard: {
      clmer: false,
      nazionalita: true,
      nazioni: true,
      regioni: true,
      tipologia: true,
      clienti: true,
      famiglia: true,
      articoli: true,
      flitri: false,
      south: true
    },
    filtri: {
      anno: {
        inizio: 0,
        fine: 0
      },
      cd_clm: [],
      nazionalita: '',
      cd_naz: '',
      regione: '',
      cd_sogg_fat: null,
      cd_fam: null,
    },
    selectedComboNazione: null
  },
  formulas: {
    textFiltri: {
      bind: {
        nazionalita: '{filtri.nazionalita}',
        nazione: '{filtri.cd_naz}',
        cliente: '{filtri.cd_sogg_fat}',
        filtri: '{filtri}',
      },
      get: function (r) {

        let text = `${Locale.t('stt.forms.budget.analisi.filtri.form.anno.label')}: <b>${r.filtri.anno.inizio}-${r.filtri.anno.fine}</b>`;
        text += `, ${Locale.t('stt.forms.budget.analisi.filtri.form.clmer.label')}: <b>[${r.filtri.cd_clm.join(", ")}]</b>`;

        text += `, ${Locale.t('stt.forms.budget.analisi.filtri.form.nazionalita.label')}`;
        if (r.filtri.nazionalita === 'ee') {
          text += ': <b>' + Locale.t('stt.forms.budget.analisi.filtri.form.nazionalita.ee') + '</b>';
          text += `, ${Locale.t('stt.forms.budget.analisi.filtri.form.nazioni.label')} <b>${r.filtri.cd_naz}</b>`;
        } else if (r.filtri.nazionalita === 'it') {
          text += ': <b>' + Locale.t('stt.forms.budget.analisi.filtri.form.nazionalita.it') + '</b>';
          text += `, ${Locale.t('stt.forms.budget.analisi.cards.regioni.title')} <b>${r.filtri.regione}</b>`;
        }
        if (r.filtri.cd_sogg_fat) {
          text += `, ${Locale.t('stt.forms.budget.analisi.cards.clienti.title')} <b>${r.filtri.cd_sogg_fat}</b>`;
        }

        return text;
      }
    }
  }
});
