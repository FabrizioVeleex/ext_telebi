/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stver.store.forms.anno.StoreAnno', {
    extend: "portal.v1.store.grids.Store",
    alias: "store.v1-versamenti-anno",
    requires: [
        "stver.model.forms.anno.GridModel"
    ],
    model: "stver.model.forms.anno.GridModel",
    proxy: {
        type: "rest",
        timeout: 60000,
        url: Backend.REST_API + "grids/anno/getstore/",
        extraParams: {stabilimento:'',tipo:1,semi:1,anno:''},
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
        beforeload: 'beforeloadAnno'
    }
});