/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.store.grids.jobs.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-jobs',
    requires: [
        'nsm.model.grids.Jobs',
    ],
    model: 'nsm.model.grids.Jobs',

    proxy: {
        url: Backend.REST_API + 'grids/jobs/getstore/',
    }
});