/**
 * Created by luke on 12/02/21.
 */
Ext.define('fmc.view.forms.destinatario.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-destinatario',

    requires: [
        'fmc.store.forms.destinatario.Gridrisorse',
        'portal.v1.store.forms.combo.GetStabilimento',
        'portal.v1.store.forms.combo.GetUsers'
    ],
    stores: {
        storeRisorse:{type:'v1-gridrisorse'}, //store riservatezze
        comboUtente:{type:'v1-getusers'}, //store utenti riservatezze
        storeSedi:{type:'v1-getstabilimento'} //store sedi
    }
});