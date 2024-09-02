/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.store.grids.funzioni.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-funzioni',
    requires:[
        'gpr.model.grids.Funzioni'
    ],
    model: 'gpr.model.grids.Funzioni',
    proxy: {
        url: Backend.REST_API + 'grids/funzioni/getstore/'
    }
});