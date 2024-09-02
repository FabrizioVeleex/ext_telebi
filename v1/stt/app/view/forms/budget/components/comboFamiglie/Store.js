/**
 * Created by fabrizio on 06/01/23.
 */
Ext.define('stt.view.forms.budget.components.comboFamiglie.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-analisi-storecombofamiglie',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'cd_fam', type: 'string' },
        { name: 'descr_fam', type: 'string' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/budget/analisi/famiglie/getStoreComboFiltri/',
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
        beforeload: 'onBeforeLoadFiltriFamiglie'
    }

});
