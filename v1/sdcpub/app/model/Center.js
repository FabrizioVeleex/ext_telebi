/**
 * Created by luca on 13/09/2017.
 */
Ext.define('sdcpub.model.Center', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'id', type: 'string'},
        {name:'subject', type: 'string'},
        {name:'datedoc',type: 'string'},
        {name:'datestop',type: 'string'},
    ],
    proxy: {
        type: 'rest',
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