/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stres.store.forms.globale.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-stres-globale",
    requires: [
        "stres.model.forms.globale.GridModel"
    ],
    model: "stres.model.forms.globale.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/globale/getstore/",
        extraParams: {cdcli:'',cdart:''},
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