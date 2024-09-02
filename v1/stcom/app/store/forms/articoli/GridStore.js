/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.store.forms.articoli.GridStore', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-stcom-articoli",
    requires: [
        "stcom.model.forms.articoli.GridModel"
    ],
    model: "stcom.model.forms.articoli.GridModel",
    proxy: {
        type: "rest",
        timeout: 90000,
        url: Backend.REST_API + "grids/articoli/getstore/",
        extraParams: {cdart:'',clm:'',cdcli:'',tipocli:'',capoarea:'',nazione:'',regione:'',mese:''},
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