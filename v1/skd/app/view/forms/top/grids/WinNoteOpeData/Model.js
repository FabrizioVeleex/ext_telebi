/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.top.grids.WinNoteOpeData.Model', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.grid-noteOpeData',
  requires: [
    'skd.store.forms.pick.GridOperatore'
  ],
  stores: {
    storeGridPreparatorePick: { type: 'gridOperatore-pickfiltri' },
  },

  data: {
    record: {}
  },

});
