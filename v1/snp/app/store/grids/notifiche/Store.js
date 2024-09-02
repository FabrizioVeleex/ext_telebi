/**
 * Created by luca on 01/03/2018.
 */
Ext.define('snp.store.grids.notifiche.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-notifiche',
    requires:[
        'snp.model.grids.Notifiche'
    ],
    model: 'snp.model.grids.Notifiche',
    proxy: {
        url: Backend.REST_API + 'grids/notifiche/getstore/'
    }
});