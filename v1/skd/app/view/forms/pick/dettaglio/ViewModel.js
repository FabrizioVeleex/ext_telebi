/**
 * Created by fabrizio on 02/01/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.dettagliopick',
  requires: [
    'skd.store.forms.filtri.ComboCdl',
    'skd.store.forms.filtri.ComboOperazione',
    'skd.store.forms.filtri.ComboReparto',
    'skd.store.forms.filtri.GridReparto',
    'skd.view.forms.pick.dettaglio.panel.grid.Store',
    'skd.view.forms.pick.dettaglio.panel.filtri.StoreComboComponent',
    'skd.view.forms.pick.dettaglio.panel.filtri.StoreComboPartOdp',
    'skd.view.forms.pick.dettaglio.panel.filtri.StoreGridCdl',
    'skd.view.forms.pick.dettaglio.panel.filtri.StoreGridComponent',
    'skd.store.forms.pick.GridOperatore',
    'skd.store.forms.filtri.GridStato'
  ],
  stores: {
    filtriPick: {},
    store: { type: 'v1-form-pich-pick' },
    storeComboReparto: { type: 'comboReparto' },
    storeComboOperazione: { type: 'comboOperazione' },
    // storeComboTipoLd: {type: 'comboTipoLd'},
    storeComboTipoLd: {
      fields: [
        { name: 'id', type: 'number' },
        { name: 'tipo', type: 'string' }
      ],
      data: [
        { id: 0, tipo: 'Tutti' },
        { id: 1, tipo: 'Acquistato' },
        { id: 2, tipo: 'Prodotto' }
      ]
    },
    storeComboGiacenza: {
      fields: [
        { name: 'id', type: 'number' },
        { name: 'giacenza', type: 'string' }
      ],
      data: [
        { id: 0, giacenza: 'Giacenza' },
        { id: 4, giacenza: 'Giacenza presunta' },
        { id: 3, giacenza: 'Giacenza presunta no RDA/POP' }
      ]
    },
    storeComboPartOdp: { type: 'combopartodppick' },
    storeComboCdl: { type: 'comboCdl' },

    storeComboComp: { type: 'comboComponentpick' },
    storeGridPreparatorePick: { type: 'gridOperatore-pickfiltri' },
    storeGridStatoPick: { type: 'gridStato-filtri' }, //TODO VERIFICARE

    storeGridPickReparto: { type: 'gridReparto-filtri' },
    storeGridDettCdl: { type: 'gridCdl-filtripick' },
    storeGridDettPartOdp: { type: 'gridComponent-filtripick' },
    storeGridDettComp: { type: 'gridComponent-filtripick' }
  },
  data: {
    alertMaxValue: "",
    fielLabelqta_preparata: "",
    disableDate: {
      inizio_preparazione: true,
      inizio_effettivo: true,
      inizio_produzione: true,
      fine_preparazione: true,
      completato_senza_mancanti: true,
      num: 0
    },
    readOnly: true,
    recordForm: null, //record da gestire nel form di destra
    filtripick: {},

    record: [],
    // disableUpdate: true, //FIXME Rimuovi
    statusApp: true, //FIXME cos'è?
    formDettaglio: true //FIXME Rimuovi
  },
  formulas: {
    disableUpdate: {
      bind: {
        recordForm: "{recordForm}",
        disableDate: "{disableDate}",
      },
      get: function (data) {
        // gestione abilitazione azioni
        if (data.recordForm && (data.disableDate.num >= 100 && data.disableDate.num <= 1110)) {
          return false
        }
        return true
      }
    },
    disableForm: {
      bind: {
        recordForm: '{recordForm}'
      },
      get: function (data) {
        return data.recordForm === null;
      },
    },
    maxValue: {
      bind: {
        recordForm: '{recordForm}'
      },
      get: function (data) {
        //FIXME
        if (!data.recordForm) return
        let recordForm = data.recordForm;
        if (recordForm['onhand'] < recordForm['mat_per_lab']) {
          return recordForm['onhand'];
        } else {
          return recordForm['mat_per_lab'];
        }
      }
    },
    iconCls: {
      bind: {
        record: '{record}'
      },
      get: function (data) {
        let record = data.record;
        if (record['nota'] !== '') {
          // meta.tdAttr = 'data-qtip="'+Ext.htmlEncode(record.data['nota'])+'"';
          return 'fas fa-info-circle bd-color-blue'
        } else {
          return 'fas fa-exclamation-circle bd-color-orange'
        }
      }
    },
    panelTitle: {
      bind: {
        component: '{recordForm.component}',
        description_comp: '{recordForm.description_comp}'
      },
      get: function (data) {
        //FIXME
        if (data.recordForm === null) return;
        let titolo = data.component;
        let description_comp = data.description_comp;
        if (titolo === null) {
          return ' <b>Nessun componente selezionato</b>';
        }
        return ' <b>' + titolo + ' - ' + description_comp + '</b>';
      }
    }
  }
});
