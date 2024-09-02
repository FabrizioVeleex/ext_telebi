/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboOrder', {
    extend: 'Ext.data.Store',
    alias:'store.comboOrder',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'sc_op_lab', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcomboorder/',
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
