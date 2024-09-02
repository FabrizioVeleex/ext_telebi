/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.destinatari.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-destinatari',
    requires:[
        'vms.model.grids.Destinatari'
    ],
    model: 'vms.model.grids.Destinatari',
    proxy: {
        url: Backend.REST_API + 'grids/destinatari/getstore/'
    }
});