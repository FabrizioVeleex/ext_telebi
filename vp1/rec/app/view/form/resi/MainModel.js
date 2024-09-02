/**
 * Created by fabrizio on 19/02/17.
 */
Ext.define("recpub.view.form.resi.MainModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.mainresi",
  requires: [
    "recpub.view.form.resi.nuovo.StoreComboCausali",
    'recpub.view.form.resi.dettaglio.StoreArticoli'
  ],

  stores: {
    comboStoreCausali: { type: "comboStoreCausali" },
    storeDettaglio: {type:"v1-rec-articoli",autoload:false}
  }
});
