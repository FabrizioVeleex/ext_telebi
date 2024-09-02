/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.store.forms.modulo.Combodip', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combodip',
    requires:[
        'Ext.data.proxy.Rest',
        'mcd.model.forms.modulo.Combodip'
    ],
    model:'mcd.model.forms.modulo.Combodip',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/modulo/combodip/',
        extraParams: {'idsede':99},
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