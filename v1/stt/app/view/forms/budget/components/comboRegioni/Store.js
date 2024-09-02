/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.components.comboRegioni.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-analisi-storecomboregioni',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'regione', type: 'string' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/budget/analisi/regioni/getStoreComboFiltri/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }

});
