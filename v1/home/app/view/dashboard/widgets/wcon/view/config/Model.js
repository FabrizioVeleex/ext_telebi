/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.config.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wconconfig',

    requires: [
        'home.view.dashboard.widgets.wcon.store.ComboEsclusi',
        'home.view.dashboard.widgets.wcon.store.StoreEsclusi'
    ],

    stores: {
        storeEsclusi:{type:'v1-wconesclusi'}, //store esclusi
        comboEsclusi:{type:'v1-wconcomboesclusi'} //combo esclusioni
    }
});