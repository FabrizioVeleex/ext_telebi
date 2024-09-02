/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.store.grids.immagini.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-immagini',
    requires:[
        'gpr.model.grids.Immagini'
    ],
    model: 'gpr.model.grids.Immagini',
    proxy: {
        url: Backend.REST_API + 'grids/immagini/getstore/',
        extraParams: {famiglia:'',veicolo:''}
    }
});