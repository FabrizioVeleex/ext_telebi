Ext.define('nsm.store.forms.job.ComboLog', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-combolog',
  fields: [
    'id',
    'descrizione'
  ],
  data: [
    { id: 'daily', descrizione: 'Giornaliero' },
    { id: 'single', descrizione: 'Processo' },
  ]
});