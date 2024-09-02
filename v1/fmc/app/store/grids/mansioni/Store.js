/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.mansioni.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-mansioni',
    requires:[
        'fmc.model.grids.Mansioni'
    ],
    model: 'fmc.model.grids.Mansioni',
    proxy: {
        url: Backend.REST_API + 'grids/mansioni/getstore/'
    }
});