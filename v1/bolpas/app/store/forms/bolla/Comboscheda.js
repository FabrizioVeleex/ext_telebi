/**
 * Created by luke on 28/06/21.
 */
Ext.define('bolpas.store.forms.bolla.Comboscheda', {
    extend: 'Ext.data.Store',
    alias:'store.v1-comboscheda',
    requires:[
        'Ext.data.proxy.Rest',
        'bolpas.model.forms.bolla.Comboscheda'
    ],
    model:'bolpas.model.forms.bolla.Comboscheda',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bolla/comboscheda/',
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