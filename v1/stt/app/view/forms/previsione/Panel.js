/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.previsione.Panel", {
  extend: "portal.v1.view.forms.singleForm.Panel",
  requires: ["stt.view.forms.previsione.Controller", "stt.view.forms.previsione.ViewModel"],
  title: "Budget delle vendite",
  controller: "v1-stt-previsione",
  viewModel: "v1-stt-previsione",
  listeners: {
    afterRender: "onAfterRender",
  },
});
