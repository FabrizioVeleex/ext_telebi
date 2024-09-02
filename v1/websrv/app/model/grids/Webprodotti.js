/**
 * Created by luke on 2018-12-24.
 */
Ext.define('websrv.model.grids.Webprodotti', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.webprodotti',
    fields: [{name: 'id', type: 'string'},{name: 'cdcli', type: 'string'},{name: 'ragsoc', type: 'string'}]
});