/**
 * Created by luke on 2019-06-03.
 */
Ext.define('mcd.store.grids.nominativi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-nominativi',
    requires:['mcd.model.grids.Nominativi'],
    model: 'mcd.model.grids.Nominativi',
    proxy: {
        url: Backend.REST_API + 'grids/nominativi/getstore/'
    }
});