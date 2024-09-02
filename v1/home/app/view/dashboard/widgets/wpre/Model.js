/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-widgetpre',

    requires: [
        'home.view.dashboard.widgets.wpre.store.GridNote',
        'home.view.dashboard.widgets.wpre.store.GridStore'
    ],
    stores: {
        store:{type:'v1-widgetstorewpre'},
        storeNote:{type:'v1-wpre-gridnote'}
    },
    data: {
        nota:[],
        ricerca:'',
        sede:'',
        title:'',
        data: new Date(),
        dataNow: new Date(),
        totali: {},
        hideEdit: true,
        hideTotali: false,
        titlereparti: '',
    }
});
