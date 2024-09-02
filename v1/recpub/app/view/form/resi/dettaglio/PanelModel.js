/**
 * Created by fabrizio on 25/02/22.
 */
Ext.define("recpub.view.form.resi.dettaglio.PanelModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.dettaglio",
  requires: ["recpub.view.form.resi.dettaglio.StoreArticoli", "recpub.view.form.resi.dettaglio.ViewModel"],
  data: {
    record: Ext.create("recpub.view.form.resi.dettaglio.ViewModel"),
    list: [],
  },
  stores: {
    storearticoli: { type: "gridarticoli" },
  },
});
