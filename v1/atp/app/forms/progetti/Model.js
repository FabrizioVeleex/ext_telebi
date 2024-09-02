/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.Model', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        { name: 'action', type: 'int', defaultValue: 0 },//0:none,1:update(new),2:delete
        { name: 'isnew', type: 'int', defaultValue: 0 }, //0 = false, 1 true
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'title', type: 'string', defaultValue: "" },
        { name: 'description', type: 'string', defaultValue: "" },
        { name: 'activityType', type: 'string', defaultValue: "" },
        { name: 'priority', type: 'int', defaultValue: 0 },
        { name: 'expireDate', type: 'date', dateFormat: 'c' },
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/progetti/',
        extraParams: { _fn: 'data' },
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