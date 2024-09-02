/**
 * Created by fabrizio on 14/10/21.
 */
Ext.define('sdc.model.forms.dominio.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',type: 'int',defaultValue:0}, //0 = false, 1 true
        {name:'id',defaultValue:''},
        {name:'valore',defaultValue:''},
        {name:'tipo',defaultValue:0}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/dominio/',
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