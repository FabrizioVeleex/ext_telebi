/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.corsi.Effettuati', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-effettuati',
    requires:[
        'fmc.model.grids.Corsi'
    ],
    model: 'fmc.model.grids.Corsi',
    proxy: {
        url: Backend.REST_API + 'grids/effettuati/getstore/'
    }
});