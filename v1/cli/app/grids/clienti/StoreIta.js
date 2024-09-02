/**
 * Created by luke on 04/10/2019.
 */
Ext.define('cli.grids.clienti.StoreIta', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-clientiita',
    requires:[
        'cli.grids.clienti.Model'
    ],
    model: 'cli.grids.clienti.Model',
    proxy: {
        url: Backend.REST_API + 'grids/clientiita/getstore/'
    }
});