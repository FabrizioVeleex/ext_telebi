/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.ritardi.components.gridAndamento.Store", {
  extend: "portal.v1.store.grids.BufferStore",
  alias: "store.stt-v1-form-ritardi-storeandamento",
  requires: ["stt.view.forms.ritardi.components.gridAndamento.Model"],
  model: "stt.view.forms.ritardi.components.gridAndamento.Model",
  pageSize: 200,
  leadingBufferZone: 100,
  listeners: {
    load: 'setTotals'
  },
  proxy: {
    type: "rest",
    timeout: 60000,
    url: Backend.REST_API + "forms/ritardi/getstoreandamento/",
    extraParams: {},
    reader: {
      type: "json",
      rootProperty: "data",
    },
    writer: {
      type: "json",
      writeAllFields: true,
    },
  },
});
