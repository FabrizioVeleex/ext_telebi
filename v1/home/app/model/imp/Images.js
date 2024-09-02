/**
 * Created by fabrizio on 14/09/16.
 */
Ext.define('home.model.imp.Images', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],
    fields: [
        { name:'id', type:'string' },
        { name: 'action', defaultValue: 0},//0:none,1:update,2:delete
        { name: 'isnew', defaultValue: 0}, //0 = false, 1 true
        { name: 'filename', defaultValue: ''}, //0 = false, 1 true
        { name: 'src', type:'string',defaultValue:'/images/picture-add.png' },
        { name: 'titolo', type:'string',defaultValue:Locale.t('global.btn.add')  }
    ],
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.REST_API + 'forms/imp/getlistwallpaper/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'}
    }
});