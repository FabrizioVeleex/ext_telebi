/**
 * Created by luke on 15/02/21.
 * Combo per recuperare utenti
 */
Ext.define('portal.v1.store.forms.combo.GetUsers', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getusers',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetUsers'
    ],
    model:'portal.v1.model.forms.combo.GetUsers',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getusers/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});