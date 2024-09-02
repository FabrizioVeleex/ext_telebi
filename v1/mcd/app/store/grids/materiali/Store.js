/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.store.grids.materiali.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-materiali',
    requires:['mcd.model.grids.Materiali'],
    model: 'mcd.model.grids.Materiali',
    proxy: {
        url: Backend.REST_API + 'grids/materiali/getstore/'
    }
});