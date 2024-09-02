/**
 * Created by fabrizio on 12/05/2023.
 */
Ext.define('itm.grids.attributi.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'changed', type: 'boolean', defaultValue: false },
    { name: 'language', type: 'string' },
    { name: 'attributo', type: 'string' },
    { name: 'sorting', type: 'number' }
  ]
});