/**
 * Created by luke on 03/02/21.
 */
Ext.define('cde.view.forms.webprodotto.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-form-webprodotto',

    requires: [
        'cde.view.forms.webprodotto.component.StoreAccessi'
    ],
    stores:{
        store:{type:'v1-form-gridaccessi'}
    },
    data:{
        cardactive:'info'
    },
    formulas: {

    }
});