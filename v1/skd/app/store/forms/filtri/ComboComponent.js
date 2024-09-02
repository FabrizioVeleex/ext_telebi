/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.ComboComponent', {
    extend: 'Ext.data.Store',
    alias:'store.comboComponent',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'part_no', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombocomponent/',
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
