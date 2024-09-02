/**
 * Created by luke on 15/02/21.
 * Combo per recuperare soggetti clienti/fornitori
 */
Ext.define('portal.v1.store.forms.combo.GetCompanies', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getcompanies',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetCompanies'
    ],
    model:'portal.v1.model.forms.combo.GetCompanies',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getcompanies/',
        extraParams:{tiposoggetto:''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});