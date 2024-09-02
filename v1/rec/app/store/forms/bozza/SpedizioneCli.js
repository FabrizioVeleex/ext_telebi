/**
 * Created by luca on 31/07/2017.
 */
Ext.define('rec.store.forms.bozza.SpedizioneCli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-spedizionecli',
    requires:[
        'Ext.data.proxy.Rest',
        'rec.model.forms.bozza.ComboSpedizione'
    ],
    model:'rec.model.forms.bozza.ComboSpedizione',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bozza/combospedizione/',
        extraParams: {tipo:'C'},
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