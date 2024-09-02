/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sgv.view.grids.segnalazioni.istruttoria.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-istruttoria',
    requires: [
        'sgv.view.grids.segnalazioni.component.Model'
    ],
    model: 'sgv.view.grids.segnalazioni.component.Model',

    proxy: {
        url: Backend.REST_API + 'grids/istruttoria/getstore/'
    }
});