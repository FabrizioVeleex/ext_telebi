/**
 * Created by luke on 09/06/23.
 */
Ext.define('cli.forms.cliente.store.Contatti', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-cli-contatti',
    requires:[
        'Ext.data.proxy.Rest',
        'cli.forms.cliente.components.ContattiModel'
    ],
    model:'cli.forms.cliente.components.ContattiModel',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/cliente/contatti/',
        extraParams: {idcli:''},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    listeners: {
        beforeLoad:'onBeforeLoadContatti'
    }
});