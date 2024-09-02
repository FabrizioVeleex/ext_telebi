/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.send.grid.Store', {
  extend: 'Ext.data.Store',
  alias: 'store.panotec-gridsend-store',
  requires: [
    'prd.global.cdl.cards.send.grid.Model'
  ],
  model: 'prd.global.cdl.cards.send.grid.Model',
  proxy: {
    type: 'memory',
    simpleSortMode: true,
    reader: { type: 'json', rootProperty: 'data' },
  },

});