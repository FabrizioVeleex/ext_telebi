/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.store.forms.progetto.GridMail', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmail',
    requires:[
        'Ext.data.proxy.Rest',
        'vda.model.forms.progetto.GridMail'
    ],
    model:'vda.model.forms.progetto.GridMail',
    listeners: {
        beforeLoad:'onBeforeLoad'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/progetto/getmail/',
        extraParams: {idrecord:''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
})