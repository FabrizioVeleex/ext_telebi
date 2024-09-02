/**
 * Created by luke on 26/08/21.
 */
Ext.define('rec.store.grids.archiviati.ComboRegioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-comboregioni',
    requires:[
        'Ext.data.proxy.Rest',
        'rec.model.grids.ComboRegioni'
    ],
    model:'rec.model.grids.ComboRegioni',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'grids/archiviati/getregioni/',
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