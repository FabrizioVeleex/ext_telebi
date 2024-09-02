/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.ritardi.Panel", {
  extend: "portal.v1.view.forms.singleForm.Panel",
  requires: ["stt.view.forms.ritardi.Controller", "stt.view.forms.ritardi.ViewModel"],
  title: "Andamento Residui",
  controller: "v1-stt-ritardi",
  viewModel: "v1-stt-ritardi",
  listeners: {
    afterRender: "onAfterRender",
  },
});
