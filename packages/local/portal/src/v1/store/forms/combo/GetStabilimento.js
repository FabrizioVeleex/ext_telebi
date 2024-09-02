/**
 * Created by luke on 15/02/21.
 * Combo per recuperare utenti
 */
Ext.define('portal.v1.store.forms.combo.GetStabilimento', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getstabilimento',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetStabilimento'
    ],
    model:'portal.v1.model.forms.combo.GetStabilimento',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getstabilimento/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});