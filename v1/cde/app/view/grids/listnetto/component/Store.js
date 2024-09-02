/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('cde.view.grids.listnetto.component.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-cde-listnetto',
    requires: [
        'cde.view.grids.listnetto.component.Model'
    ],
    model: 'cde.view.grids.listnetto.component.Model',

    proxy: {
        url: Backend.REST_API + 'grids/listnetto/getstore/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});