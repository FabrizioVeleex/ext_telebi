/**
 * Created by luke on 15/02/21.
 * Combo per recuperare utenti/UO/ruoli funzionali
 */
Ext.define('portal.v1.store.forms.combo.GetResources', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getresources',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetResources'
    ],
    model:'portal.v1.model.forms.combo.GetResources',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getresources/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});