/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.controlli.Effettuati', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-effettuati',
    requires:[
        'vms.model.grids.Controlli'
    ],
    model: 'vms.model.grids.Controlli',
    proxy: {
        url: Backend.REST_API + 'grids/controlli/effettuati/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});