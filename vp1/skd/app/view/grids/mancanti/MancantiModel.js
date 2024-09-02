/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.mancanti.MancantiModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mancanti',
  requires: [
    'skd.store.forms.pick.GridOperatore'
  ],

  stores: {
    storeGridPreparatorePick: { type: 'gridOperatore-pickfiltri' },

  },

  data: {
    widthNote: 200
    /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
  },
  formula: {

  }
});