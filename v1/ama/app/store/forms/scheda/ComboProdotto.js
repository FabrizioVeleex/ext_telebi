/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('ama.store.forms.scheda.ComboProdotto', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboprodotto',
    requires:[
        'Ext.data.proxy.Rest',
        'ama.model.forms.scheda.ComboProdotto'
    ],
    model:'ama.model.forms.scheda.ComboProdotto',
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