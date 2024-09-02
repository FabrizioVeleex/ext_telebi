/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.grids.progetti.Store', {
  extend: 'portal.v1.store.grids.BufferStore',
  alias: 'store.v1-atp-store-progetti',
  requires: [
    'atp.grids.progetti.Model'
  ],
  model: 'atp.grids.progetti.Model',

  proxy: {
    url: Backend.REST_API + 'grids/progetti/getStore/'
  }
});