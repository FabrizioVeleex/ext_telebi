/**
 * Created by luca on 06/12/2016.
 */
Ext.define('rec.store.grids.famcausali.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-famcausali',
    requires:[
        'rec.model.grids.Famcausali'
    ],
    model: 'rec.model.grids.Famcausali',
    proxy: {
        url: Backend.REST_API + 'grids/famcausali/getstore/'
    }
});