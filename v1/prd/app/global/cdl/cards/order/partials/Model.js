/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.order.partials.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'cd_art', type: 'string', defaultValue: '' },
    { name: 'endDate', type: 'date', dateFormat: 'c' },
    { name: 'startDate', type: 'date', dateFormat: 'c' },
    { name: 'dateLog', type: 'date', dateFormat: 'c' },
  ]
});