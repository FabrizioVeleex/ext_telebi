/**
 * Created by fabrizio on 24/01/23.
 */

Ext.define('stt.view.forms.budget.components.comboClMer.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-analisi-storecomboclmer',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'cd_clm', type: 'string' },
        { name: 'descr_clm', type: 'string' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/budget/analisi/clmer/getStoreComboFiltri/',
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
