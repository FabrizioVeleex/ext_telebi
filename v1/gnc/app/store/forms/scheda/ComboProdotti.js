/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('gnc.store.forms.scheda.ComboProdotti', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboprodotti',
    requires:[
        'Ext.data.proxy.Rest',
        'gnc.model.forms.scheda.ComboProdotti'
    ],
    model:'gnc.model.forms.scheda.ComboProdotti',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/scheda/comboprodotto/',
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