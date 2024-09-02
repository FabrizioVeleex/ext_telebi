/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.fascicolo.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-fascicolo',

    requires: [
        'ana.store.forms.fascicolo.GridSchede'
    ],
    stores:{
        storeSchede:{type:'v1-gridschede'}
    }
});