Ext.define('dip.store.grids.sistema.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.sistema',
    requires:[
        'dip.model.grids.Sistema'
    ],
    model: 'dip.model.grids.Sistema',
    proxy: {
        url: Backend.REST_API + 'grids/sistema/getstore/'
    }
});