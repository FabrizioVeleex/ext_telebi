/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sgv.view.grids.segnalazioni.inoltrate.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-inoltrate',
    requires: [
        'sgv.view.grids.segnalazioni.component.Model'
    ],
    model: 'sgv.view.grids.segnalazioni.component.Model',

    proxy: {
        url: Backend.REST_API + 'grids/inoltrate/getstore/'
    }
});