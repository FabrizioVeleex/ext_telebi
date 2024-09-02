/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.obbiettivo.cards.StoreDet', {
  extend: 'portal.v1.store.grids.Store',
  alias: 'store.v1-stt-store-cli-art-det',
  requires: [
    'stt.view.forms.obbiettivo.cards.StoreModel'
  ],
  model: 'stt.view.forms.obbiettivo.cards.StoreModel',
  data: [],
  remoteSort: false,
  remoteFilter: false,
  proxy: {
    url: Backend.REST_API + 'forms/obbiettivo/getstoredet/',
    extraParams: {}
  }
});