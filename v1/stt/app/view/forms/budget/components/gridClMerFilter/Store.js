/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.components.gridClMerFilter.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.stt-v1-form-analisi-storefiltrigridclmer',
    fields: [
        { name: 'cd_clm', type: 'string' },
        { name: 'descr_clm', type: 'string' },
    ],

    data: []

});
