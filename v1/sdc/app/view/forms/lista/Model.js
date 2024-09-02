/**
 * Created by Fabrizio on 14/10/21.
 */
Ext.define('sdc.view.forms.lista.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-lista',

    requires: [
        'sdc.store.forms.lista.GridElenco',
    ],
    stores: {
        storeElenco:{type:'v1-storeelenco'},
    },
    data:{
        cardactive:'lista',
    },
    formulas: {

    }
});