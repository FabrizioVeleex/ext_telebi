/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.organigrammi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-organigrammi',
    requires: [
        'amm.model.grids.Organigrammi'
    ],
    model: 'amm.model.grids.Organigrammi',
    proxy: {
        url: Backend.REST_API + 'grids/organigrammi/getstore/'
    }
});