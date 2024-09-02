/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.forms.ruolo.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-ruolo',
    requires: [
        'amm.store.forms.ruolo.Componenti'
    ],
    stores:{
        storeComponenti:{type:'v1-componenti'} //store componenti
    },
    data: {
        cardactive:'info'
    }
});