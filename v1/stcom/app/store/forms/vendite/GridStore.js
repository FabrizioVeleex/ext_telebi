/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.store.forms.vendite.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-stcom-vendite",
    requires: [
        "stcom.model.forms.vendite.GridModel"
    ],
    model: "stcom.model.forms.vendite.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/vendite/getstore/",
        extraParams: {cdcli:'',tipocli:'',capoarea:'',nazione:'',regione:'',mese:''},
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