/**
 * Created by luke on 03/02/21.
 */
Ext.define('websrv.view.forms.webprodotto.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-webprodotto',

    requires: [
        'websrv.store.forms.webprodotto.GridAccessi'
    ],
    stores:{
        store:{type:'v1-gridaccessi'}
    },
    data:{
        cardactive:'info'
    },
    formulas: {

    }
});