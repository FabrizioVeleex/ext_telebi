/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stver.store.grids.targets.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-targets',
    requires:[
        'stver.model.grids.Targets'
    ],
    model: 'stver.model.grids.Targets',
    proxy: {
        url: Backend.REST_API + 'grids/targets/getstore/'
    }
});