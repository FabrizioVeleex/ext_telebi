/**
 * Created by luke on 05/03/21.
 */
Ext.define('bolfor.forms.bolla.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-bolfor-bolla',

    requires: [
        'bolfor.forms.bolla.storeform.StoreArticoli',
        'bolfor.forms.bolla.storeform.StoreOrdine',
        'bolfor.forms.bolla.storeform.StoreTipo',
        'portal.v1.store.forms.combo.GetSuppliers'
    ],
    stores: {
        storeTipo:{type:'v1-bolfor-storetipo'}, //store tipologia bolla
        storeFornitori:{type:'v1-getsuppliers'}, //store fornitore
        storeOrdini:{type:'v1-bolfor-storeordine'}, //store ordini fornitori
        storeArticoli:{type:'v1-bolfor-gridarticoli'} //store articoli
    }
});