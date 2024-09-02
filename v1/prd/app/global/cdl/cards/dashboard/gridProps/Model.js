/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridProps.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'cd_art', type: 'string', defaultValue: '' },
    { name: 'desc_art', type: 'string', defaultValue: '' }
  ]
});