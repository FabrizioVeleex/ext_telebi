/**
 * Created by luca on 31/07/2017.
 */
Ext.define('vda.store.forms.progetto.ComboScheda', {
    extend: 'Ext.data.Store',
    alias:'store.v1-comboscheda',
    requires:[
        'Ext.data.proxy.Rest',
        'vda.model.forms.progetto.ComboScheda'
    ],
    model:'vda.model.forms.progetto.ComboScheda',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/progetto/comboscheda/',
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