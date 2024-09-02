/**
 * Created by luca on 27/09/16.
 */
Ext.define('eve.store.forms.scheda.LingueCombo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-linguecombo',
    requires:[
        'Ext.data.proxy.Rest',
        'eve.model.forms.scheda.LingueCombo'
    ],
    model:'eve.model.forms.scheda.LingueCombo',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/scheda/lingue/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});