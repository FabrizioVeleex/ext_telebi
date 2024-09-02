/**
 * Created by luke on 23/08/21.
 */
Ext.define('amm.view.forms.modulowidget.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-modulowidget',

    requires: [
        'amm.store.forms.modulo.ComboRuoli',
        'amm.store.forms.modulo.GridAutorizzazioni',
        'amm.store.forms.modulo.GridRuoli',
        'amm.store.forms.modulo.GridVersioni',
        'portal.v1.store.forms.combo.GetResources'
    ],
    stores:{
        storeRuoli:{type:'v1-gridruoli'}, //store ruoli assegnati
        comboRisorsa:{type:'v1-getresources'}, //combo risorse
        comboRuoli:{type:'v1-comboruoli'}, //combo ruoli
        storeAutorizzazioni:{type:'v1-gridautorizzazioni'}, //store autorizzazioni
        storeVersioni:{type:'v1-gridversioni'} //store versioni
    },
    data: {
        cardactive:'info'
    }
});