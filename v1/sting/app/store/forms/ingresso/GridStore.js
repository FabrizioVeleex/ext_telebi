/**
 * Created by luca on 16/02/2017.
 */
Ext.define('sting.store.forms.ingresso.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-sting-ingresso",
    requires: [
        "sting.model.forms.ingresso.GridModel"
    ],
    model: "sting.model.forms.ingresso.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/ingressi/getstore/",
        extraParams: {cdfor:'',cdart:'',tipo:''},
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