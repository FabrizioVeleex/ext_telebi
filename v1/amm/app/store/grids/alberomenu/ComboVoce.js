/**
 * Created by luca on 06/09/16.
 */
Ext.define('amm.store.grids.alberomenu.ComboVoce', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combovoce',
    requires:[
        'Ext.data.proxy.Rest',
        'amm.model.grids.ComboVoce'
    ],
    model:'amm.model.grids.ComboVoce',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'grids/alberomenu/combovoce/',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});