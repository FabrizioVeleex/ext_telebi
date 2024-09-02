/**
 * Created by luca on 06/12/2016.
 */
Ext.define('rec.store.grids.rottamazioni.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-rottamazioni',
    requires:[
        'rec.model.grids.Condizioni'
    ],
    model: 'rec.model.grids.Condizioni',
    proxy: {
        url: Backend.REST_API + 'grids/rottamazioni/getstore/'
    }
});