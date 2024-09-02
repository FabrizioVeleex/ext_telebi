/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('dip.store.grids.parametri.Parametri', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.parametri',
    requires:[
        'dip.model.grids.Parametri'
    ],
    model: 'dip.model.grids.Parametri',

    proxy: {
        url: Backend.REST_API + 'grids/parametri/getstore/'
    }
});