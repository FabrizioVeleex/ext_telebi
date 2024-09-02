/**
 * Created by luke on 03/02/21.
 */
Ext.define('websrv.view.forms.assoricambio.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-assoricambio',

    requires: [
        'websrv.store.forms.assoricambio.GridArticoli',
        'websrv.store.forms.assoricambio.GridAzioni'
    ],
    stores:{
        storeArticoli:{type:'v1-gridarticoli'},
        storeAzioni:{type:'v1-gridazioni'}
    },
    data:{
        cardactive:'info'
    },
    formulas: {

    }
});