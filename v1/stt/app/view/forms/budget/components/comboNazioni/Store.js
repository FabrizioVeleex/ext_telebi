/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.components.comboNazioni.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-analisi-storecombonazioni',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'cd_naz', type: 'string' },
        { name: 'descr_naz', type: 'string' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/budget/analisi/nazioni/getStoreComboFiltri/',
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
