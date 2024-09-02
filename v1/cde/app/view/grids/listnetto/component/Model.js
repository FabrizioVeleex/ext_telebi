/**
 * Created by luke on 2019-02-22.
 */
Ext.define('cde.view.grids.listnetto.component.Model', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.v1-cde-listnetto',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cd_art', type: 'string'},
        {name: 'cd_cli', type: 'string'},
        {name: 'descr_art', type: 'string'},
        {name: 'cliente', type: 'string'},
        {name: 'cdcom1', type: 'string'},
        {name: 'cdcom2', type: 'string'},
        {name: 'cdcom3', type: 'string'},
        {name: 'dateins', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'datestart', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'dateend', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'prezzo', type: 'float'},
        {name: 'sconto1', type: 'float'},
        {name: 'sconto2', type: 'float'},
        {name: 'sito', type: 'int'}
    ]
});