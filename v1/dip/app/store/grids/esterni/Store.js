Ext.define('dip.store.grids.esterni.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.esterni',
    requires:[
        'dip.model.grids.Esterni'
    ],
    model: 'dip.model.grids.Esterni',
    proxy: {
        url: Backend.REST_API + 'grids/esterni/getstore/'
    }
});