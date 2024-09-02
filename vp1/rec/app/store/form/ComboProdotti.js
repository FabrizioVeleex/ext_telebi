/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('recpub.store.form.ComboProdotti', {
    extend: 'Ext.data.Store',
    alias: 'store.comboStoreProdotti-old',
    // sorters: [{
    //     property: 'dtbos',
    //     direction: 'ASC'
    // }],
    data:[],
    requires:[
      'recpub.model.form.ComboProdotti'
    ],
    model:'recpub.model.form.ComboProdotti'
});