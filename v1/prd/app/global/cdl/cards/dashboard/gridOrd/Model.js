/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridOrder.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'endDate', type: 'date', dateFormat: 'c' },
    { name: 'startDate', type: 'date', dateFormat: 'c' },
    { name: 'desc_art', type: 'string', defaultValue: '' }
  ]
});