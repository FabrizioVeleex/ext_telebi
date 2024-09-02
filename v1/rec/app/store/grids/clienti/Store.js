/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.clienti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-clienti',
    requires:[
        'rec.model.grids.Clienti'
    ],
    model: 'rec.model.grids.Clienti',
    proxy: {
        url: Backend.REST_API + 'grids/clienti/getstore/'
    }
})