/**
 * Created by luke on 04/10/2019.
 */
Ext.define('cli.grids.clienti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-clienti',
    requires:[
        'cli.grids.clienti.Model'
    ],
    model: 'cli.grids.clienti.Model',
    proxy: {
        url: Backend.REST_API + 'grids/clienti/getstore/'
    }
});