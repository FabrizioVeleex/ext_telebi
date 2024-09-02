/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridSituazioneOrdiniRighe.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-ritardi-store-ordini-righe",
  requires: ["stt.view.forms.ritardi.components.gridSituazioneOrdiniRighe.Model"],
  model: "stt.view.forms.ritardi.components.gridSituazioneOrdiniRighe.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/ritardi/getSituazioneRighe/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});
