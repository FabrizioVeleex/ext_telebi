/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Store", {
  extend: "Ext.data.Store",
  alias: "store.stt-ritardi-store-ordini-testate",
  requires: ["stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Model"],
  model: "stt.view.forms.ritardi.components.gridSituazioneOrdiniTestate.Model",
  proxy: {
    type: 'rest',
    simpleSortMode: true,
    url: Backend.REST_API + 'forms/ritardi/getSituazioneTerstata/',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'totalCount'
    }
  }
});

