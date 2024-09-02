/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.view.forms.controllo.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-controllo',

    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel',
        'vms.store.forms.controllo.ComboProdotti',
        'vms.store.forms.controllo.ComboTipologie'
    ],
    stores: {
        storeProdotti:{type:'v1-comboprodotti'}, //store attrezzature
        storeTipologie:{type:'v1-combotipologie'}, //store tipologie
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
})