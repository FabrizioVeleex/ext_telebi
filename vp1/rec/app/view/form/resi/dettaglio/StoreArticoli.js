/**
 * Created by luca on 17/03/2017.
 */
Ext.define('recpub.view.form.resi.dettaglio.StoreArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-rec-articoli',
    requires:[
        'Ext.data.proxy.Rest',
        'recpub.view.form.resi.dettaglio.ModelArticoli'
    ],
    model:'recpub.view.form.resi.dettaglio.ModelArticoli',
    proxy: {
        type: "rest",
        simpleSortMode: true,
        extraParams: {},
        url: Backend.REST_API + "forms/dettaglio/getarticoli/",
        reader: { type: "json", rootProperty: "data" },
        writer: {
            type: "json",
            writeAllFields: true,
        }
    }
});