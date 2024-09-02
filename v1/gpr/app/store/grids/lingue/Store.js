/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.store.grids.lingue.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-lingue',
    requires:[
        'gpr.model.grids.Lingue'
    ],
    model: 'gpr.model.grids.Lingue',
    proxy: {
        url: Backend.REST_API + 'grids/lingue/getstore/'
    }
});