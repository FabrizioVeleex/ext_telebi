/**
 * Created by fabrizio on 18/03/2024.
 */
Ext.define('prd.global.cdl.cards.history.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'cd_art', type: 'string', defaultValue: '' },
    { name: 'desc_art', type: 'string', defaultValue: '' },
    { name: 'startDate', type: 'date', dateFormat: 'c' },
  ]
});