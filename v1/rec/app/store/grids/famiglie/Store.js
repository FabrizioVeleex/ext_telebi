/**
 * Created by luca on 06/12/2016.
 */
Ext.define('rec.store.grids.famiglie.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-famiglie',
    requires:[
        'rec.model.grids.Famiglie'
    ],
    model: 'rec.model.grids.Famiglie',
    proxy: {
        url: Backend.REST_API + 'grids/famiglie/getstore/'
    }
});