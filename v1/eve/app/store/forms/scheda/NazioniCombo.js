/**
 * Created by luca on 27/09/16.
 */
Ext.define('eve.store.forms.scheda.NazioniCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-nazionicombo',
    requires:[
        'Ext.data.proxy.Rest',
        'eve.model.forms.scheda.NazioniCombo'
    ],
    model:'eve.model.forms.scheda.NazioniCombo',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/scheda/nazioni/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});