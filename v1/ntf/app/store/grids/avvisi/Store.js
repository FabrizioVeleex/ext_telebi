/**
 * Created by luca on 07/09/16.
 */
Ext.define('ntf.store.grids.avvisi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',

    alias:'store.v1-avvisi',
    requires:[
        'ntf.model.grids.Avvisi'
    ],
    model: 'ntf.model.grids.Avvisi',
    proxy: {
        url: Backend.REST_API + 'grids/avvisi/getstore/',
        extraParams: {stato:'',tagapp:''}
    }
});