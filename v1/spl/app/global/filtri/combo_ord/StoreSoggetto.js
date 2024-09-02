/**
 * Created by fabrizio on 19/02/2022.
 */
Ext.define('spl.global.filtri.combo_ord.StoreSoggetto', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-spl-global-filtri-ord-combocli',
    remoteSort: false,
    fields: ['id', 'cdcli', 'ragsoc'],
    proxy: {
        type: 'ajax',
        simpleSortMode: true,
        url: Backend.REST_API + "functions/form/getcli/",
        reader: { type: 'json', rootProperty: 'data' }
    }
});
