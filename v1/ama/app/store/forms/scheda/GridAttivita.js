/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('ama.store.forms.scheda.GridAttivita', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridattivita',
    requires:[
        'Ext.data.proxy.Rest',
        'ama.model.forms.scheda.GridAttivita'
    ],
    model:'ama.model.forms.scheda.GridAttivita',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/scheda/attivita/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    },
    listeners: {
        beforeLoad:'onBeforeLoadAttivita'
    }
});