/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.distinte.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias: 'store.itm-v1-grids-distinte',
    requires: [
        'itm.grids.distinte.Model'
    ],
    model: 'itm.grids.distinte.Model',
    proxy: {
        url: Backend.REST_API + 'grids/distinte/getstore/'
    }
});