/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.ComboNote', {
    extend: 'Ext.data.Store',
    alias:'store.comboNote',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'note', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombonote/',
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
