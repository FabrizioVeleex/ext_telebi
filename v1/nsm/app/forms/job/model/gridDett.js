/**
 * Created by luca on 17/08/16.
 */
Ext.define('nsm.model.forms.job.gridDett', {
  extend: 'Ext.data.Model',
  alias: 'viewmodel.job.v1-griddett',
  fields: [
    { name: 'msg', type: 'auto' },
    { name: 'esito', type: 'number' },
    { name: 'data', type: 'date', dateFormat: 'Y-m-d H:i:s' },
  ]
});