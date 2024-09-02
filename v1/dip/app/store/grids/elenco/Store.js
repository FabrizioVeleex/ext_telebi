Ext.define('dip.store.grids.elenco.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.elenco',
    requires:[
        'dip.model.grids.Elenco'
    ],
    model: 'dip.model.grids.Elenco',
    proxy: {
        url: Backend.REST_API + 'grids/elenco/getstore/'
    }
});