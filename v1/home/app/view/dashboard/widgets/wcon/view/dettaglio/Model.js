/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.dettaglio.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wcondettaglio',

    requires: [
        'home.view.dashboard.widgets.wcon.store.GridDettaglio'
    ],

    stores: {
        storeDettaglio:{type:'v1-wcongriddettaglio'}
    },

    data: {
        record:{}
    }
});