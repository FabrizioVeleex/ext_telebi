/**
 * Created by fabrizio on 10/04/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridOrder.Store', {
  extend: 'Ext.data.Store',
  alias: 'store.global-cdl-cards-dashboard-gridord-store',
  requires: [
    'prd.global.cdl.cards.dashboard.gridOrder.Model'
  ],
  model: 'prd.global.cdl.cards.dashboard.gridOrder.Model',
  pageSize: null,

  proxy: {
    type: 'rest',
    simpleSortMode: true,
    implicitIncludes: false,
    reader: { type: 'json', rootProperty: 'data' },
    url: Backend.REST_API + "functions/getOrders/"
  },

});