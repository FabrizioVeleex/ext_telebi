/**
 * Created by luca on 06/12/2016.
 */
Ext.define('rec.store.grids.causali.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-causali',
    requires:[
        'rec.model.grids.Causali'
    ],
    model: 'rec.model.grids.Causali',
    proxy: {
        url: Backend.REST_API + 'grids/causali/getstore/'
    }
});