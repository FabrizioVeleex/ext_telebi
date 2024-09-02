/**
 * Created by luca on 09/11/2016.
 */
Ext.define('gpr.store.grids.immagini.Famiglie', {
    extend: 'Ext.data.Store',
    alias:'store.v1-famiglie',
    requires:[
        'Ext.data.proxy.Rest',
        'gpr.model.grids.Famiglie'
    ],
    model:'gpr.model.grids.Famiglie',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'grids/immagini/getfamiglie/',
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