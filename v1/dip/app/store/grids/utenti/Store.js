Ext.define('dip.store.grids.utenti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.utenti',
    requires:[
        'dip.model.grids.Utenti',
    ],
    model: 'dip.model.grids.Utenti',
    proxy: {
        url: Backend.REST_API + 'grids/utenti/getstore/',
    }
});