/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.bolle.completate.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-bolfor-completate',
    requires: [
        'bolfor.grids.bolle.BolleModel'
    ],
    model: 'bolfor.grids.bolle.BolleModel',
    proxy: {
        url: Backend.REST_API + 'grids/completate/getstore/'
    }
});