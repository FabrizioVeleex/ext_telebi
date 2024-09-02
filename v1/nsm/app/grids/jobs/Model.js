Ext.define('nsm.view.grids.jobs.Model', {
  extend: 'portal.v1.view.grids.DefaultModel',
  alias: 'viewmodel.jobs',
  requires: [
    'nsm.store.grids.jobs.Store',
    'nsm.store.forms.job.ComboTipoServizio',
    'nsm.store.forms.job.ComboApplicazione',
  ],
  stores: {
    store: { type: 'v1-jobs', autoLoad: false },
    comboTipoServizio: { type: 'v1-combotiposervizio' }, //store tipo servizio
    comboApplicazione: { type: 'v1-comboapplicazione' }, //store lista applicativi
  },
  data: {
    titolo: Locale.t('nsm.grids.jobs.title')
  }
});