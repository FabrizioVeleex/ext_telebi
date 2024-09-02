/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wordresiduo',

    requires: [
        'home.view.dashboard.widgets.word.store.GridResiduo',
        'home.view.dashboard.widgets.word.view.residuo.StoreDettaglio'
    ],

    stores: {
        storeResiduo:{type:'v1-wordresidui'},
        storeResiduoDettaglio:{type:'v1-word-residuo-dettaglio'}
    },
    data: {
        record:{}
    }
});