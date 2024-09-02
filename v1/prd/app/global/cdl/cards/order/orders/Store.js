/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.order.orders.Store', {
  extend: 'Ext.data.Store',
  alias: 'store.global-cdl-cards-order-orders-store',
  requires: [
    'prd.global.cdl.cards.order.grid.Model'
  ],
  model: 'prd.global.cdl.cards.order.grid.Model',
  proxy: {
    type: 'memory',
    simpleSortMode: true,
    reader: { type: 'json', rootProperty: 'data' },
  },

});