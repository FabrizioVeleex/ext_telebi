/**
 * Created by luke on 27/11/22.
 */
Ext.define('gnc.store.forms.scheda.ComboFornitori', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combofornitori',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetCompanies'
    ],
    model:'portal.v1.model.forms.combo.GetCompanies',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/scheda/combofornitori/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});