/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridProps.Store', {
  extend: 'Ext.data.Store',
  alias: 'store.global-cdl-cards-dashboard-gridprops-store',
  requires: [
    'prd.global.cdl.cards.dashboard.gridProps.Model'
  ],
  model: 'prd.global.cdl.cards.dashboard.gridProps.Model',
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    reader: { type: 'json', rootProperty: 'data' },
    url: Backend.REST_API + "functions/getProps/",
  },

});