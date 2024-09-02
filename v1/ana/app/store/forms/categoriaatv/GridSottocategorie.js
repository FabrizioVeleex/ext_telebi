/**
 * Created by luca on 27/06/2017.
 */
Ext.define('ana.store.forms.categoriaatv.GridSottocategorie', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridsottocategorie',
    requires:[
        'Ext.data.proxy.Rest',
        'ana.model.forms.categoriaatv.Gridsottocategorie'
    ],
    model: 'ana.model.forms.categoriaatv.Gridsottocategorie',

    listeners: {
        beforeLoad:'onBeforeLoad'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'forms/categoriaatv/getsottocategorie/',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});