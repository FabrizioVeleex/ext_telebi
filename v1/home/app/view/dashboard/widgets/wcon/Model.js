/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wcon',

    requires: [
        'home.view.dashboard.widgets.wcon.store.ComboNazioni',
        'home.view.dashboard.widgets.wcon.store.ComboRegioni',
        'home.view.dashboard.widgets.wcon.store.Store'
    ],

    stores: {
        store:{type:'v1-storewcon'},
        storeNazioni:{type:'v1-wconcombonazioni'},
        storeRegioni:{type:'v1-wconcomboregioni'}
    },

    data: {
        ricerca:'',
        nazione:'',
        regione:'',
        radionaz:0,
        title:''
    }
});