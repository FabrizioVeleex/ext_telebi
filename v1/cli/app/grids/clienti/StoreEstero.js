/**
 * Created by luke on 04/10/2019.
 */
Ext.define('cli.grids.clienti.StoreEstero', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-clientiestero',
    requires:[
        'cli.grids.clienti.Model'
    ],
    model: 'cli.grids.clienti.Model',
    proxy: {
        url: Backend.REST_API + 'grids/clientiestero/getstore/'
    }
});