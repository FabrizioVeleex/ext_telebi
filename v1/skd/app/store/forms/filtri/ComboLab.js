/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboLab', {
    extend: 'Ext.data.Store',
    alias:'store.comboLab',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'sc_op_lab', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombolab/',
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
