/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.scheda.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-scheda',

    requires: [
        'fmc.store.forms.scheda.ComboMansioni',
        'fmc.store.forms.scheda.CorsiEffettuati',
        'fmc.store.forms.scheda.CorsiPrevisti',
        'fmc.store.forms.scheda.GridAltreMansioni',
        'fmc.store.forms.scheda.GridCheck',
        'fmc.store.forms.scheda.GridCompetenze',
        'portal.v1.store.forms.combo.GetStabilimento',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],

    stores: {
        storeMansioni:{type:'v1-combomansioni'}, //store mansioni
        storeSedi:{type:'v1-getstabilimento'}, //store sedi
        storeAltreMansioni:{type:'v1-gridaltremansioni'}, //grid mansioni aggiuntive
        storeCompetenze:{type:'v1-gridcompetenze'}, //grid competenze
        storePrevisti:{type:'v1-corsiprevisti'}, //corsi previsti
        storeEffettuati:{type:'v1-corsieffettuati'}, //corsi effettuati
        storeCheck:{type:'v1-gridcheck'}, //verifiche
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})