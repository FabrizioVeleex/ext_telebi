/**
 * Created by luke on 12/02/21.
 */
Ext.define('cde.view.forms.notifica.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-form-cde-notifica',

    requires: [
        'cde.view.forms.notifica.component.StoreGridRisorse',
        'portal.v1.store.forms.combo.GetUsers'
    ],
    stores: {
        storeRisorse:{type:'v1-form-cde-gridrisorse'}, //store utenti
        comboUtente:{type:'v1-getusers'} //combo utenti
    }
});