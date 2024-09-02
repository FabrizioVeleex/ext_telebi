/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.archiviati.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-archiviati',
    requires:[
        'rec.model.grids.Documenti'
    ],
    model: 'rec.model.grids.Documenti',
    proxy: {
        url: Backend.REST_API + 'grids/archiviati/getstore/',
        extraParams: {idpadre:'NaN',nazione:'9',paese:'',regione:''}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});