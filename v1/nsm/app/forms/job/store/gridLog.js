Ext.define('nsm.store.forms.job.gridLog', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-gridjob',
    requires:[
        'nsm.model.forms.job.gridLog'
    ],
    model: 'nsm.model.forms.job.gridLog',
    proxy: {
        url: Backend.REST_API + 'forms/job/get/gridlogstore/'
    }
});