/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.tipologie.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-tipologie',
    requires:[
        'fmc.model.grids.Tipologie'
    ],
    model: 'fmc.model.grids.Tipologie',
    proxy: {
        url: Backend.REST_API + 'grids/tipologie/getstore/'
    }
});