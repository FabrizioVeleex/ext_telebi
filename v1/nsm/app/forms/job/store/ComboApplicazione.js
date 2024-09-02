Ext.define('nsm.store.forms.job.ComboApplicazione', {
  extend: 'Ext.data.Store',
  alias: 'store.v1-comboapplicazione',
  requires: [
    'Ext.data.proxy.Rest'
  ],
  fields: [
    'id'
  ],
  proxy: {
    type: 'rest',
    url: Backend.REST_API + 'forms/job/get/comboAppStore/',
    appendId: false,
    reader: {
      type: 'json',
      rootProperty: 'data'
    },
    writer: {
      type: 'json',
      writeAllFields: true
    }
  },
});