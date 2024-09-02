/**
 * Created by luke on 15/02/21.
 * Combo per recuperare soggetti clienti/fornitori
 */
Ext.define('portal.v1.store.forms.combo.GetNazioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getnazioni',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetNazioni'
    ],
    model:'portal.v1.model.forms.combo.GetNazioni',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getnazioni/',
        extraParams:{tiposoggetto:''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});