/**
 * Created by luca on 06/12/2016.
 */

Ext.define('pak.view.forms.config.model.Form', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'action', defaultValue: 0 },//0:none,1:update(new),2:delete
        { name: 'isnew', defaultValue: 0 }, //0 = false, 1 true
        { name: 'id', defaultValue: '' },
        { name: 'replyTo', defaultValue: '' },
        { name: 'mittente', defaultValue: '' },
        { name: 'email', defaultValue: '' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/config/',
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