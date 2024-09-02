/**
 * Created by fabrizio on 06/01/23.
 */
Ext.define('stt.view.forms.budget.components.comboClienti.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-analisi-storecomboclienti',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'cd_naz', type: 'string' },
        { name: 'descr_naz', type: 'string' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/budget/analisi/clienti/getStoreComboFiltri/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    listeners: {
        beforeload: 'onBeforeLoadFiltriClienti'
    }

});
