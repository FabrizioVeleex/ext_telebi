/**
 * Created by luke on 27/11/2019.
 */
Ext.define('vms.store.forms.controllo.ComboProdotti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-comboprodotti',
    fields:[
        'id','descrizione','reparto','matricola','tipo','sede'
    ],
    data:[]
});