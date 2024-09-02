Ext.define('nsm.store.forms.job.ComboTipoServizio', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-combotiposervizio',
  fields: [
    'id'
  ],
  data: [
    { id: 'Manuale' },
    { id: 'Schedulato' },
    { id: 'Ciclo infinito' },
    { id: 'Disattivato' },
    { id: 'Testing' }
  ]
});