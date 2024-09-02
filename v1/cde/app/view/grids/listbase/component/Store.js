/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('cde.view.grids.listbase.component.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-cde-listbase',
    requires: [
        'cde.view.grids.listbase.component.Model'
    ],
    model: 'cde.view.grids.listbase.component.Model',

    proxy: {
        url: Backend.REST_API + 'grids/listbase/getstore/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});