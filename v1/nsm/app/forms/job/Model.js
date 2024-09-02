Ext.define('nsm.view.forms.job.Model', {
  extend: 'portal.v1.view.forms.mainCard.Model',
  alias: 'viewmodel.v1-job',

  requires: [
    'nsm.store.forms.job.ComboTipo',
    'nsm.store.forms.job.ComboTipoServizio',
    'nsm.store.forms.job.ComboLog',
    'nsm.store.forms.job.ComboApplicazione',
    'nsm.store.forms.job.gridDett',
    'nsm.store.forms.job.gridLog'
  ],
  data: {
    hideJob: false,
    cardactive: 'job',
    titoloDett: ''
  },

  stores: {
    gridLog: { type: 'v1-gridjob', autoLoad: false, rifId: 'gridLog' }, //store grid card log
    gridDett: { type: 'v1-griddett', autoLoad: false, rifId: 'gridDett' }, //store grid card log
    comboTipo: { type: 'v1-combotipo' }, //store tipo schedulazione
    comboTipoServizio: { type: 'v1-combotiposervizio' }, //store tipo servizio
    comboLog: { type: 'v1-combolog' }, //store tipo salvataggio log
    comboApplicazione: { type: 'v1-comboapplicazione' }, //store lista applicativi
  },
  formulas: {
    hide_job: {
      bind: {
        combo: {
          selection: '{combotipo.selection}',
          deep: true
        },
        record: '{record}',
      },
      get: function (r) {
        if (r.combo.selection) {
          return r.combo.selection.data['id'] !== 'job'
        }
        return false;
      }
    },
    hide_cron: {
      bind: {
        combo: {
          selection: '{combotipo.selection}',
          deep: true
        },
        record: '{record}',
      },
      get: function (r) {
        if (r.combo.selection) {
          return r.combo.selection.data['id'] !== 'cron'
        }
        return false;
      },
    }
  }
});