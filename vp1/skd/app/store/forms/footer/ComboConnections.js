/**
 * Created by Fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.footer.ComboConnections', {
    extend: 'Ext.data.Store',
    alias:'store.comboconnections',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields:[
        'id','name'
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcomboconnections/',
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
