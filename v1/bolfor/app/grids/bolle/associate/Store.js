/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.bolle.associate.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-bolfor-associate',
    requires: [
        'bolfor.grids.bolle.BolleModel'
    ],
    model: 'bolfor.grids.bolle.BolleModel',
    proxy: {
        url: Backend.REST_API + 'grids/associate/getstore/'
    }
});