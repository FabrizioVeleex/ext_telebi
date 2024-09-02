/**
 * Created by luca on 06/12/2016.
 */
Ext.define('gnc.store.grids.steps.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-steps',
    requires:[
        'gnc.model.grids.Steps'
    ],
    model: 'gnc.model.grids.Steps',
    proxy: {
        url: Backend.REST_API + 'grids/steps/getstore/'
    }
});