/**
 * Created by luca on 16/02/2017.
 */
Ext.define('snp.store.grids.destinatari.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-destinatari',
    requires:[
        'snp.model.grids.Destinatari'
    ],
    model: 'snp.model.grids.Destinatari',
    proxy: {
        url: Backend.REST_API + 'grids/destinatari/getstore/'
    }
});