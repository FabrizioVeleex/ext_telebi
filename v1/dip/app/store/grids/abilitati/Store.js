Ext.define('dip.store.grids.abilitati.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.abilitati',
    requires: [
        'dip.model.grids.Abilitati'
    ],
    model: 'dip.model.grids.Abilitati',

    proxy: {
        url: Backend.REST_API + 'grids/abilitati/getstore/'
    }
});