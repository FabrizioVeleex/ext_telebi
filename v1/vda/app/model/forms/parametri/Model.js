/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.model.forms.parametri.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'id',defaultValue:''},
        {name:'idcategoria',type:'string',defaultValue: ''}
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