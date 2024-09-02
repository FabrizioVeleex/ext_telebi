/**
 * Created by luke on 29/07/21.
 */
Ext.define('amm.model.forms.scrivania.Model', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'id',defaultValue:''},
        {name:'nome',defaultValue:''},
        {name:'startmenu',defaultValue:0},
        {name:'posta',defaultValue:0},
        {name:'taskbar',defaultValue:0},
        {name:'notifiche',defaultValue:0}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/scrivania/',
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