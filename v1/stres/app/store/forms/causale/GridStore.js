/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stres.store.forms.causale.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-stres-causale",
    requires: [
        "stres.model.forms.causale.GridModel"
    ],
    model: "stres.model.forms.causale.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/causale/getstore/",
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