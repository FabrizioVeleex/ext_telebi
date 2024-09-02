/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.grids.obbiettivi.Store", {
  extend: 'portal.v1.store.grids.Store',
  alias: 'store.v1-stt-obbiettivi',
  requires: [
    'stt.view.grids.obbiettivi.Model',
  ],
  model: 'stt.view.grids.obbiettivi.Model',

  proxy: {
    url: Backend.REST_API + 'grids/obbiettivi/getstore/',
  }
});
