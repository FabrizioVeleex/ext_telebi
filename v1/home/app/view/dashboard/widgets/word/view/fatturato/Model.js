/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.fatturato.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wordfatturato',

    requires: [
        'home.view.dashboard.widgets.word.store.GridFatturato'
    ],

    stores: {
        storeFatturato:{type:'v1-wordfatturato'}
    },

    data: {
        record:{}
    }
});