/**
 * Created by luke on 28/06/21.
 */
Ext.define('bolpas.store.forms.bolla.Comboreso', {
    extend: 'Ext.data.Store',
    alias:'store.v1-comboreso',
    requires:[
        'Ext.data.proxy.Rest',
        'bolpas.model.forms.bolla.Comboreso'
    ],
    model:'bolpas.model.forms.bolla.Comboreso',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bolla/comboreso/',
        extraParams: {idcli:''},
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