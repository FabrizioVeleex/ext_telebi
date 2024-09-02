/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-widgetort',

    requires:[
        'home.view.dashboard.widgets.wort.store.Chart',
        'home.view.dashboard.widgets.wort.store.ComboFamiglie',
        'home.view.dashboard.widgets.wort.store.ComboNazioni',
        'home.view.dashboard.widgets.wort.store.ComboRegioni',
        'home.view.dashboard.widgets.wort.store.GridArticoli',
        'home.view.dashboard.widgets.wort.store.GridDettaglio',
        'home.view.dashboard.widgets.wort.store.GridStore',
        'home.view.dashboard.widgets.wort.store.Nazioni'
    ],

    stores: {
        store:{type:'v1-widgetstorewort',autoLoad: false},
        storeDettaglio:{type:'v1-wort-dettaglio'},
        storeArticoli:{type:'v1-wort-articoli'},
        storeNaz:{type:'v1-wort-nazioni'},
        storeChart:{type:'v1-wort-chart'},
        storePaesi:{type:'v1-wort-combonazioni',autoLoad:false},
        storeRegioni:{type:'v1-wort-comboregioni',autoLoad:false},
        storeFamiglie:{type:'v1-wort-combofamiglie',autoLoad:false}
    },
    data: {
        data: new Date(),
        dataNow: new Date(),
        datato: new Date(),
        q:'',
        naz:'T',
        hideNaz: true,
        hideexcel: true,
        record: [],
        recordDettaglio: {
            dtconconf: '',
            dtconric: '',
            importo: 0,
            numero: '',
            cambio: ''
        },
    }
});
