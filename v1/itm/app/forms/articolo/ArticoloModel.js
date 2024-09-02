/**
 * Created by luke on 04/10/2019.
 */
Ext.define('itm.model.forms.articolo.ArticoloModel', {
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
        { name: 'cd_art', defaultValue: '' },
        { name: 'cd_art_int', defaultValue: '' },
        { name: 'descr_art', defaultValue: '' },
        { name: 'pubblica_sito', type: "number" },
        { name: 'id_padre', type: "string", defaultValue: '' },
        { name: 'cd_fam', defaultValue: '' },
        { name: 'cl_mer', defaultValue: '' },
        { name: 'cd_gruppo', defaultValue: '' },
        { name: 'cd_sottogruppo', defaultValue: '' },
        { name: 'cd_ragg', defaultValue: '' },
        { name: 'um', defaultValue: '' },
        { name: 'peso', type: 'float', defaultValue: 0 },
        { name: 'liv_min', type: 'int', defaultValue: 0 },
        { name: 'dateupdate', type: 'date', dateFormat: 'c' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/articolo/',
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