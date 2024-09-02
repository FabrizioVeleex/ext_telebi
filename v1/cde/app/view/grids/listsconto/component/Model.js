/**
 * Created by luke on 2019-02-22.
 */
Ext.define('cde.view.grids.listsconto.component.Model', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.v1-cde-listsconto',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'cd_gruppo', type: 'string'},
        {name: 'cliente', type: 'string'},
        {name: 'cd_cli', type: 'string'},
        {name: 'dateins', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'datestart', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'sconto1', type: 'float'},
        {name: 'sconto2', type: 'float'},
        {name: 'sito', type: 'int'}
    ]
});