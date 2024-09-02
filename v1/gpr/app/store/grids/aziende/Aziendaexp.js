/**
 * Created by luca on 09/11/2016.
 */
Ext.define('gpr.store.grids.aziende.Aziendaexp', {
    extend: 'Ext.data.Store',
    alias:'store.v1-aziendaexp',
    requires:[
        'Ext.data.proxy.Rest',
        'gpr.model.grids.Aziendaexp'
    ],
    model:'gpr.model.grids.Aziendaexp',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'grids/prodotti/getaziende/',
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