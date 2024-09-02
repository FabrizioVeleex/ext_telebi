/**
 * Created by luke on 12/02/21.
 */
Ext.define('amm.view.forms.voce.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-voce',

    requires: [
        'amm.store.forms.voce.Moduliapp',
        'amm.store.forms.voce.Tipovoci'
    ],
    stores:{
        storeVoci:{type:'v1-tipovoci'}, //store tipo voci
        storeModuli:{type:'v1-moduliapp'} //store moduli
    }
});