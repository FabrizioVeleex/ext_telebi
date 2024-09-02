/**
 * Created by luca on 20/02/2017.
 */
Ext.define('recpub.view.form.resi.resi.ModelOpen', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.GridOpen',
    requires: [
        'Ext.data.*'
    ],
    fields: [
        {name: 'id', type: 'string'},
        {name: 'datadoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'progressivo', type: 'string'},
        {name: 'stato', type: 'string'},
        {name: 'dossier', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'grids/resi/getstore',
        extraParams: {_fn: 'storeopen'},
        reader: {type: 'json', rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});