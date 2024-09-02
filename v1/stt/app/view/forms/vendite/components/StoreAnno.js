/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stt.view.forms.vendite.components.StoreAnno', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-vendite-anno",
    requires: [
        "stt.view.forms.vendite.components.GridModel"
    ],
    model: "stt.view.forms.vendite.components.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/vendite/getstore/",
       // extraParams: {stabilimento:'',tipo:1,semi:1},
        reader: {
            type: "json",
            rootProperty: "data",
        },
        writer: {
            type: "json",
            writeAllFields: true,
        }
    },
    listeners:{
       // beforeload: 'beforeloadAnno'
    }
});