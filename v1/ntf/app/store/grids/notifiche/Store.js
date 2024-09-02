/**
 * Created by luca on 13/09/16.
 */
Ext.define('ntf.store.grids.notifiche.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-notifiche',
    requires:[
        'ntf.model.grids.Notifiche'
    ],
    model: 'ntf.model.grids.Notifiche',
    proxy: {
        url: Backend.REST_API + 'grids/notifiche/getstore/',
        extraParams: {stato:'',tagapp:''}
    }
});