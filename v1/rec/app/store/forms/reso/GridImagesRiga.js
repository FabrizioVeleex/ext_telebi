/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('rec.store.forms.reso.GridImagesRiga', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-gridimagesriga',
    requires:[
        'Ext.data.proxy.Rest',
        'rec.model.forms.reso.GridImagesRiga'
    ],
    model:'rec.model.forms.reso.GridImagesRiga',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/reso/gridimagesriga/',
        extraParams: {idriga:''},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
})