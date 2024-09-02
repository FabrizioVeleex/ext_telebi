Ext.define('nsm.store.forms.job.gridDett', {
  extend: 'portal.v1.store.grids.Store',
  alias: 'store.v1-griddett',
  requires: [
    'nsm.model.forms.job.gridDett'
  ],
  model: 'nsm.model.forms.job.gridDett',
  proxy: {
    url: Backend.REST_API + 'forms/job/get/griddettstore/'
  },
  data: []
});