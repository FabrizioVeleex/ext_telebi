/**
 * Created by luca on 16/07/2018.
 */
Ext.define('bolfor.forms.parametri.ModelData', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'id',defaultValue:''},
        {name:'pathscan',defaultValue:''},
        {name:'pathnuove',defaultValue:''},
        {name:'pathbolle',defaultValue:''}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/parametri/',
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