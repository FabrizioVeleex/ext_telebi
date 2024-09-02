/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stres.store.forms.cliente.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-stres-cliente",
    requires: [
        "stres.model.forms.cliente.GridModel"
    ],
    model: "stres.model.forms.cliente.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/cliente/getstore/",
        extraParams: {cdcli:''},
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