/**
 * Created by luke on 26/08/21.
 */
Ext.define('rec.store.grids.archiviati.ComboNazioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combonazioni',
    requires:[
        'Ext.data.proxy.Rest',
        'rec.model.grids.ComboNazioni'
    ],
    model:'rec.model.grids.ComboNazioni',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'grids/archiviati/getnazioni/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});