/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.forms.documento.Gridmail', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmail',
    requires:[
        'Ext.data.proxy.Rest',
        'rec.model.forms.documento.Gridmail'
    ],
    model:'rec.model.forms.documento.Gridmail',
    listeners: {
        beforeLoad:'onBeforeLoad'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/documento/getmail/',
        extraParams: {tabella:'TBRECMAIL01',tabellaattach:'TBRECMAIL02'}, //parametri per caricamento spl\global\getmail
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});