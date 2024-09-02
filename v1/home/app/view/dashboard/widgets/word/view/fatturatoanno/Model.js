/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.fatturatoanno.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-wordfatturatoanno',

    requires: [
        'home.view.dashboard.widgets.word.store.GridFatturatoAnno'
    ],

    stores: {
        storeFatturatoAnno:{type:'v1-wordfatturatoanno'}
    },

    data: {
        record:{}
    }
});