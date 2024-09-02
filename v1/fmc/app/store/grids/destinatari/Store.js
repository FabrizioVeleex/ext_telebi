/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.destinatari.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-destinatari',
    requires:[
        'fmc.model.grids.Destinatari'
    ],
    model: 'fmc.model.grids.Destinatari',
    proxy: {
        url: Backend.REST_API + 'grids/destinatari/getstore/'
    }
});