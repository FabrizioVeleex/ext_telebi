/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboOdp', {
    extend: 'Ext.data.Store',
    alias:'store.comboOdp',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'sc_op_objstate', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcomboodp/',
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
