/**
 * Created by fabrizio on 18/03/2024.
 */
Ext.define('prd.global.cdl.cards.queue.Store', {
  extend: 'portal.v1.store.grids.BufferStore',
  alias: 'store.global-cdl-cards-queue-store',
  requires: [
    'prd.global.cdl.cards.queue.Model'
  ],
  model: 'prd.global.cdl.cards.queue.Model',
  proxy: {
    url: Backend.REST_API + "functions/getQueue/"
  }
});