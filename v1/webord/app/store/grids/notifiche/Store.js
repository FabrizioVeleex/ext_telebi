/**
 * Created by luca on 01/03/2018.
 */
Ext.define('webord.store.grids.notifiche.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-webord-notifiche',
    requires:[
        'webord.model.grids.Notifiche'
    ],
    model: 'webord.model.grids.Notifiche',
    proxy: {
        url: Backend.REST_API + 'grids/notifiche/getstore/'
    }
});