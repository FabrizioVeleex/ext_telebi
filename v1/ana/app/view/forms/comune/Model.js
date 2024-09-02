/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.comune.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-comune',

    requires: [
        'ana.store.forms.comune.ComboProvincia',
        'ana.store.forms.comune.ComboRegione'
    ],
    stores: {
        comboRegione:{type:'v1-comboregione'}, //store regioni
        comboProvincia:{type:'v1-comboprovincia'} //store province
    }
});