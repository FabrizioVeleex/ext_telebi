Ext.define('dip.store.grids.exdipendenti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.exdipendenti',
    requires:[
        'dip.model.grids.Exdipendenti'
    ],
    model: 'dip.model.grids.Exdipendenti',
    proxy: {
        url: Backend.REST_API + 'grids/exdipendenti/getstore/'
    }
});