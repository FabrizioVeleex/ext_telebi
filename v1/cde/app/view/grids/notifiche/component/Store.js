/**
 * Created by luke on 04/10/2019.
 */
Ext.define('cde.view.grids.notifiche.component.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-notifiche',
    requires:[
        'cde.view.grids.notifiche.component.Model'
    ],
    model: 'cde.view.grids.notifiche.component.Model',
    proxy: {
        url: Backend.REST_API + 'grids/notifiche/getstore/'
    }
});