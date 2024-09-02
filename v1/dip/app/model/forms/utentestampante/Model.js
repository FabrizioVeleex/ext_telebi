/**
 * Created by luca on 16/12/2016.
 */
Ext.define('dip.model.forms.utentestampante.Model', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
    ],
    fields: [
        {name:'action',defaultValue:0},//0:none,1:update(new),2:delete
        {name:'isnew',defaultValue:0}, //0 = false, 1 true
        {name:'id',defaultValue:''},
        {name:'iduser',defaultValue:'123'},
        {name:'indirizzoip',defaultValue:''},
        {name:'risorsa',defaultValue:''},
        {name:'tipo',defaultValue:'S'},
        {name:'idprinter',defaultValue:''},
        {name:'utente',defaultValue:''},
        {name:'utenteassociato',defaultValue:''},
        {name:'stampanti',type:'auto'}
    ],

    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/utentestampante/',
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