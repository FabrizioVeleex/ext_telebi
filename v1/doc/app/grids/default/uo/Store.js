/**
 * Created by luca on 27/10/2017.
 */
Ext.define('doc.view.grids.default.uo.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-grid-uo',
    requires: [
        'doc.view.grids.default.uo.Model'
    ],
    model: 'doc.view.grids.default.uo.Model',
    proxy: {
        extraParams: { idpadre: 'NaN' },
        url: Backend.REST_API + 'grids/uo/getstore/'
    }
});