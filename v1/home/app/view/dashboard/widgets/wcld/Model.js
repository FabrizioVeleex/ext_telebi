/**
 * Created by luke on 08/09/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wcld',

    requires: [
        'home.view.dashboard.widgets.wcld.store.ComboAvanzamento',
        'home.view.dashboard.widgets.wcld.store.GridStore'
    ],
    stores: {
        store:{type:'v1-store-wcld',autoLoad: false},
        storeAvanzamento:{type:'v1-wcld-avanzamento',autoLoad: false}
    },
    data: {
        title:''
    }
});