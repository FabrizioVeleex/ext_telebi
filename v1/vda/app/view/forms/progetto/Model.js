/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.progetto.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-progetto',

    requires: [
        'portal.v1.store.forms.combo.GetCustomers',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'vda.store.forms.progetto.ComboScheda',
        'vda.store.forms.progetto.GridMail'
    ],

    stores: {
        storeClienti:{type:'v1-getcustomers'}, //clienti associati
        storeAttachConcept: {model:'portal.v1.view.main.global.upload.GridAttachModel'}, //allegati concept
        storeAttachFmea: {model:'portal.v1.view.main.global.upload.GridAttachModel'},//allegati fmea
        storeAttachPfmea: {model:'portal.v1.view.main.global.upload.GridAttachModel'},//allegati pfmea
        storeAttachPpap: {model:'portal.v1.view.main.global.upload.GridAttachModel'},//allegati ppap
        storeSchede:{type:'v1-comboscheda'}, //store combo scheda collaudo
        storeMail:{type:'v1-gridmail'} //store mail inviate
    }
})