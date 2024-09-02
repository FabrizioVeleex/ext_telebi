/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.riservati.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wconriservati',
    requires: [
        'home.view.dashboard.widgets.wcon.store.ComboEsclusi',
        'home.view.dashboard.widgets.wcon.store.StoreRiservati'
    ],
    stores: {
        storeRiservati:{type:'v1-wconriservati'}, //store esclusi
        comboEsclusi:{type:'v1-wconcomboesclusi'} //combo esclusioni
    }
});