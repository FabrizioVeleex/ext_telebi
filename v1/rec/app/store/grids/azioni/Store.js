/**
 * Created by luca on 06/12/2016.
 */
Ext.define('rec.store.grids.azioni.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-azioni',
    requires:[
        'rec.model.grids.Azioni'
    ],
    model: 'rec.model.grids.Azioni',
    proxy: {
        url: Backend.REST_API + 'grids/azioni/getstore/'
    }
})