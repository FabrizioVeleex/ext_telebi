Ext.define('dip.store.grids.filiali.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.filiali',
    requires:[
        'dip.model.grids.Filiali'
    ],
    model: 'dip.model.grids.Filiali',
    proxy: {
        url: Backend.REST_API + 'grids/filiali/getstore/'
    }
});