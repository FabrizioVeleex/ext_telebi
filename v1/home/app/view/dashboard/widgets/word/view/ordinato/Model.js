/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.ordinato.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wordordinato',

    requires: [
        'home.view.dashboard.widgets.word.store.GridOrdini'
    ],

    stores: {
        storeOrdini:{type:'v1-wordordini'}
    },

    data: {
        record:{}
    }
});