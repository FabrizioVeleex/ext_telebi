/**
 * Created by luca on 16/07/2018.
 */
Ext.define('impexp.view.forms.modulo.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-modulo',

    requires: [
        'impexp.store.forms.modulo.Gridrisorse',
        'portal.v1.store.forms.combo.GetUsers'
    ],
    stores: {
        storeRisorse:{type:'v1-gridrisorse'}, //store autorizzazioni
        comboUtente:{type:'v1-getusers'} //store utenti riservatezze
    }
})