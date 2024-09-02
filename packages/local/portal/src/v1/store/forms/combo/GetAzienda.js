/**
 * Created by luke on 15/02/21.
 * Combo per recuperare utenti
 */
Ext.define('portal.v1.store.forms.combo.GetAzienda', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getazienda',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetAzienda'
    ],
    model:'portal.v1.model.forms.combo.GetAzienda',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getaziende/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});