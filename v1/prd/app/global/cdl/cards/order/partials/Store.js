/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.order.partials.Store', {
  extend: 'Ext.data.Store',
  alias: 'store.global-cdl-cards-order-partials-store',
  requires: [
    'prd.global.cdl.cards.order.partials.Model'
  ],
  model: 'prd.global.cdl.cards.order.partials.Model',
  proxy: {
    type: 'memory',
    simpleSortMode: true,
    reader: { type: 'json', rootProperty: 'data' },
  },

});