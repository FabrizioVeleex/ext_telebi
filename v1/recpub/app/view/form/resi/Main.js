/**
 * Created by fabrizio on 19/02/17.
 */
Ext.define("recpub.view.form.resi.Main", {
  extend: "Ext.panel.Panel",
  requires: ["recpub.view.form.resi.MainController", "recpub.view.form.resi.MainModel", "Ext.layout.container.Card"],
  controller: "mainresi",
  viewModel: "mainresi",
  height: 200,
  layout: {
    type: "card",
  },
  listeners: {
    afterRender: "onAfterRender",
  },
});
