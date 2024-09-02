/**
 * Created by fabrizio on 19/02/17.
 */
Ext.define("recpub.view.form.resi.resi.Panel", {
  extend: "Ext.panel.Panel",
  requires: ["recpub.view.form.resi.resi.PanelController"],
  controller: "resi",
  listeners: {
    afterRender: "onAfterRender",
    onReloadGrid: "onReloadGrid",
  },
});
