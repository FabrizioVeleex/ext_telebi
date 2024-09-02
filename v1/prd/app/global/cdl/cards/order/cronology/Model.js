/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.order.cronology.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'datalog', type: 'date', dateFormat: 'c' },
    { name: 'desc_art', type: 'string', defaultValue: '' }
  ]
});