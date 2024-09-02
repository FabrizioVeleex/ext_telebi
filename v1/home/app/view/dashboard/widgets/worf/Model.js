/**
 * Created by luke on 08/09/21.
 */
Ext.define('home.view.dashboard.widgets.worf.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-worf',

    requires: [
        'home.view.dashboard.widgets.worf.store.GridArticoli',
        'home.view.dashboard.widgets.worf.store.GridOrdini',
        'home.view.dashboard.widgets.worf.store.GridStore'
    ],
    stores: {
        store:{type:'v1-store-worf',autoLoad: false},
        storeArticoli:{type:'v1-articoli-worf',autoLoad: false},
        storeOrdini:{type:'v1-ordini-worf',autoLoad: false}
    },
    data: {
        title:''
    }
});