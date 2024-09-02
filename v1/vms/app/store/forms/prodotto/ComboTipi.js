/**
 * Created by luke on 27/11/2019.
 */
Ext.define('vms.store.forms.prodotto.ComboTipi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combotipi',
    fields:[
        'id','descrizione','tipo'
    ],
    data:[]
});