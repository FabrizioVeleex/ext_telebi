/**
 * Created by luca on 16/07/2018.
 */
Ext.define('webord.view.forms.ordine.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-ordine',

    requires: [
        'portal.v1.store.forms.combo.GetCustomers',
        'webord.store.forms.ordine.GridArticoli'
    ],
    stores: {
        storeArticoli:{type:'v1-gridarticoli'}, //grid articoli ordinati
        storeClienti:{type:'v1-getcustomers'} //store clienti portale x associazione
    }
})