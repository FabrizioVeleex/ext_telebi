/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.store.grids.archivio.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-archivio',
    requires:['mcd.model.grids.Archivio'],
    model: 'mcd.model.grids.Archivio',
    proxy: {
        url: Backend.REST_API + 'grids/archivio/getstore/'
    }
});