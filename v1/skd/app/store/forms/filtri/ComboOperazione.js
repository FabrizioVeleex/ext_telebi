/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboOperazione', {
    extend: 'Ext.data.Store',
    alias:'store.comboOperazione',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'ope_oper_status_code', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombooperazione/',
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
