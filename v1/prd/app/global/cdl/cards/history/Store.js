/**
 * Created by fabrizio on 18/03/2024.
 */
Ext.define('prd.global.cdl.cards.history.Store', {
  extend: 'portal.v1.store.grids.BufferStore',
  alias: 'store.global-cdl-cards-history-store',
  requires: [
    'prd.global.cdl.cards.history.Model'
  ],
  model: 'prd.global.cdl.cards.history.Model',
  proxy: {
    url: Backend.REST_API + "functions/getHistory/"
  },

});