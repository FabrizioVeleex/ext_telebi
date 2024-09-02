/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.tipologie.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-bolfor-tipologie',
    requires: [
        'bolfor.grids.tipologie.ModelData'
    ],
    model: 'bolfor.grids.tipologie.ModelData',
    proxy: {
        url: Backend.REST_API + 'grids/tipologie/getstore/'
    }
});