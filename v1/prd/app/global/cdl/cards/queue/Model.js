/**
 * Created by fabrizio on 18/03/2024.
 */
Ext.define('prd.global.cdl.cards.queue.Model', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'cd_art', type: 'string', defaultValue: '' },
    { name: "dateImport", type: "date", dateFormat: "C" },
  ]
});