/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.model.Parametri', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    fields: [
        { name: 'anno', type: 'number' },
        { name: 'mese', type: 'number' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_VERSION + 'widgets/word/parametri',
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
