/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.verifica.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-verifica',

    requires: [
        'fmc.store.forms.verifica.GridNominativi',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    stores: {
        storeNominativi:{type:'v1-gridnominativi'}, //store partecipanti verifica
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})