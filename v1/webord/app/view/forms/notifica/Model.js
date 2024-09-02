/**
 * Created by luke on 12/02/21.
 */
Ext.define('webord.view.forms.notifica.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-notifica',

    requires: [
        'portal.v1.store.forms.combo.GetUsers',
        'webord.store.forms.notifica.Gridrisorse'
    ],
    stores: {
        storeRisorse:{type:'v1-gridrisorse'}, //store risorse
        comboUtente:{type:'v1-getusers'} //combo risorsa
    }
});