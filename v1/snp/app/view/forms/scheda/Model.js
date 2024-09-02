/**
 * Created by luca on 16/07/2018.
 */
Ext.define('snp.view.forms.scheda.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-scheda',

    requires: [
        'snp.store.forms.scheda.GridConcorrenti',
        'snp.store.forms.scheda.TipologiaCombo'
    ],
    stores: {
        storeTipologie:{type:'v1-combotipologia'}, //store tipologie
        storeConcorrenti:{type:'v1-concorrenti'} //store concorrenti
    }
})