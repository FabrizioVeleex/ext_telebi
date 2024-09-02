/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.forms.bolla.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-bolla',
    requires: [
        'bolpas.store.forms.bolla.ComboDip',
        'bolpas.store.forms.bolla.Comboreso',
        'bolpas.store.forms.bolla.Comboscheda',
        'bolpas.store.forms.bolla.Gridarticoli',
        'bolpas.store.forms.bolla.Gridcodici',
        'bolpas.store.forms.bolla.Gridresi',
        'portal.v1.store.forms.combo.GetCompanies'
    ],
    stores:{
        storeDip:{type:'v1-combodip'}, //store ricevente
        storeSoggetti:{type:'v1-getcompanies'}, //store soggetto
        storeCodici:{type:'v1-gridcodici'}, //store materiale da codificare
        storeArticoli:{type:'v1-gridarticoli'}, //store articoli
        storeSchede:{type:'v1-comboscheda'}, //combo scheda collaudo
        storeResi:{type:'v1-gridresi'}, //grid resi associati
        storeReso:{type:'v1-comboreso'} //combo associazione reso
    },
    data: {
        cardactive:'info'
    }
});