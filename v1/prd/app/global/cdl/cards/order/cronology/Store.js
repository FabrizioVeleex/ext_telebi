/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.order.cronology.Store', {
  extend: 'Ext.data.Store',
  alias: 'store.global-cdl-cards-order-cronology-store',
  requires: [
    'prd.global.cdl.cards.order.cronology.Model'
  ],
  model: 'prd.global.cdl.cards.order.cronology.Model',
  proxy: {
    type: 'memory',
    simpleSortMode: true,
    reader: { type: 'json', rootProperty: 'data' },
  },

});