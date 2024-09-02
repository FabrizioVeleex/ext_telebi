/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.v1.model.grids.logdev.Logdev', {
  extend: 'Ext.data.Model',
  requires: [

  ],
  fields: [
    { name: 'type', type: 'number' },
    { name: 'iduser', type: 'string' },
    { name: 'username', type: 'string' },
    { name: 'file', type: 'string' },
    { name: 'line', type: 'string' },
    { name: 'msg', type: 'auto' },
    { name: 'datelog', type: 'date', dateFormat: 'Y-m-d H:i:s' }
  ]
});