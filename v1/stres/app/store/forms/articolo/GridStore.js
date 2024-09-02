/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stres.store.forms.articolo.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-stres-articolo",
    requires: [
        "stres.model.forms.articolo.GridModel"
    ],
    model: "stres.model.forms.articolo.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/articolo/getstore/",
        extraParams: {cdart:''},
        reader: {
            type: "json",
            rootProperty: "data",
        },
        writer: {
            type: "json",
            writeAllFields: true,
        }
    }
});