/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.competenze.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-competenze',
    requires:[
        'fmc.model.grids.Competenze'
    ],
    model: 'fmc.model.grids.Competenze',
    proxy: {
        url: Backend.REST_API + 'grids/competenze/getstore/'
    }
});