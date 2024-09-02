/**
 * Created by fabrizio on 20/02/17.
 */
Ext.define("recpub.view.form.resi.nuovo.Panel", {
  extend: "Ext.form.Panel",
  requires: ["recpub.view.form.resi.nuovo.PanelController", "recpub.view.form.resi.nuovo.PanelModel", "Ext.layout.container.Card"],
  controller: "resinew",
  viewModel: "resinew",
  layout: {
    type: "card",
  },
  listeners: {
    afterRender: "onAfterRender",
  },
});
