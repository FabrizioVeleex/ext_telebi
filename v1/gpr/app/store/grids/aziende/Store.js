/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.store.grids.aziende.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-aziende',
    requires:[
        'gpr.model.grids.Aziende'
    ],
    model: 'gpr.model.grids.Aziende',
    proxy: {
        url: Backend.REST_API + 'grids/aziende/getstore/'
    }
});