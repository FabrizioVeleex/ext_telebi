/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define("recpub.view.form.resi.nuovo.StoreComboProdotti", {
  extend: "Ext.data.Store",
  alias: "store.comboStoreProdotti",
  // sorters: [{
  //     property: 'dtbos',
  //     direction: 'ASC'
  // }],
  data: [],
  requires: ["recpub.view.form.resi.nuovo.ModelComboProdotti"],
  model: "recpub.view.form.resi.nuovo.ModelComboProdotti",
});
