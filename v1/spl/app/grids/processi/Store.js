/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('spl.grids.processi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-spl-store-processi',
    requires: [
        'spl.grids.processi.Model'
    ],
    model: 'spl.grids.processi.Model',

    proxy: {
        url: Backend.REST_API + 'grids/processi/getstore/'
    }
});