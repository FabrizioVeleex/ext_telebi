/**
 * Created by luke on 2018-12-24.
 */
Ext.define('cde.view.grids.webprodotti.component.Model', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.v1-grid-webprodotti',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cdcli', type: 'string'},
        {name: 'ragsoc', type: 'string'}
    ]
});