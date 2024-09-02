/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboPart', {
    extend: 'Ext.data.Store',
    alias:'store.comboPart',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'sc_op_part_no', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombopart/',
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
