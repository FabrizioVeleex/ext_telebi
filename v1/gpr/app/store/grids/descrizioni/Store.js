/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.store.grids.descrizioni.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-descrizioni',
    requires:[
        'gpr.model.grids.Descrizioni'
    ],
    model: 'gpr.model.grids.Descrizioni',
    proxy: {
        url: Backend.REST_API + 'grids/descrizioni/getstore/'
    }
});