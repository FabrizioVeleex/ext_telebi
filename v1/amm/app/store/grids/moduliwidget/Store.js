/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.moduliwidget.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-moduliwidget',
    requires: [
        'amm.model.grids.Moduliwidget'
    ],
    model: 'amm.model.grids.Moduliwidget',
    proxy: {
        url: Backend.REST_API + 'grids/moduliwidget/getstore/'
    }
});