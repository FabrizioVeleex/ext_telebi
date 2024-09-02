/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.view.forms.intervento.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-intervento',

    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel',
        'vms.store.forms.controllo.ComboProdotti'
    ],
    stores: {
        storeProdotti:{type:'v1-comboprodotti'}, //store attrezzature
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})