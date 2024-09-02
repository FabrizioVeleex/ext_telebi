/**
 * Created by luke on 12/02/21.
 */
Ext.define('gpr.view.forms.funzione.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-funzione',

    requires: [
        'gpr.store.forms.funzione.ComboColonna'
    ],

    stores: {
        comboColonna:{type:'v1-combocolonna'} //store colonna
    }
});