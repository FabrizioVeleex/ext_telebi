/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.cruscotto.CruscottoModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.cruscotto',

    requires: [
        'skd.store.forms.filtri.ComboOperatore'
    ],

    stores: {
        storeComboOperatore: {type: 'comboOperatore'}
    },

    data: {
        pianificazioneStore:[],
        odp:[],
        negativi:false,
        statusApp:false
    }
});