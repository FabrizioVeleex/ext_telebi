/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.grids.progetti.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: "" },
    { name: 'title', type: 'string', defaultValue: "" },
    { name: 'activityType', type: 'string', defaultValue: "" },
    { name: 'status', type: 'int', defaultValue: 0 },
    { name: 'progress', type: 'number', defaultValue: 0 },
    { name: 'priority', type: 'int', defaultValue: 0 },
    { name: 'expireDate', type: 'date', dateFormat: 'c' },
    { name: 'completed', type: 'int', defaultValue: 0 },
    { name: 'x', type: 'int' },
  ]
});