/**
 * Created by luca on 31/07/2017.
 */
Ext.define('vda.store.forms.parametri.ComboCategoria', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combocategoria',
    requires:[
        'Ext.data.proxy.Rest',
        'vda.model.forms.parametri.ComboCategoria'
    ],
    model:'vda.model.forms.parametri.ComboCategoria',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/parametri/combocategoria/',
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