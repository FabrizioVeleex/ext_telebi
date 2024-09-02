/**
 * Created by fabrizio on 29/09/16.
 */
Ext.define('home.model.widgets.wvoi.Chart', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'users'},
        { name: 'list'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.API_WIDGET + 'WVOI/Main.php',
        extraParams: {_fn: 'store'},
        appendId:false,
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

