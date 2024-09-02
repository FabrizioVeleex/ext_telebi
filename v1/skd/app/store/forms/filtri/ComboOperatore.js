/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboOperatore', {
    extend: 'Ext.data.Store',
    alias:'store.comboOperatore',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'ope_operatore', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombooperatore/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }

});
