/**
 * Created by fabrizio on 02/01/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'id', defaultValue: '' },
        // {name:'data_check_giac',type: 'date',dateFormat: 'c'},
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/pick/get/',
        extraParams: { _fn: 'data' },
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
