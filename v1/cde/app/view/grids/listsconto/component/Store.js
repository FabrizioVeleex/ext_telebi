/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('cde.view.grids.listsconto.component.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-cde-listsconto',
    requires: [
        'cde.view.grids.listsconto.component.Model'
    ],
    model: 'cde.view.grids.listsconto.component.Model',

    proxy: {
        url: Backend.REST_API + 'grids/listsconto/getstore/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});