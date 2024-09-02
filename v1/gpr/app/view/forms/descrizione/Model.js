/**
 * Created by luke on 12/02/21.
 */
Ext.define('gpr.view.forms.descrizione.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-descrizione',

    requires: [
        'gpr.store.forms.descrizione.ComboLingua'
    ],

    stores: {
        comboLingua:{type:'v1-combolingua'} //store lingue
    }
});