/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.progetti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vda.view.grids.progetti.Controller',
        'vda.view.grids.progetti.Model'
    ],
    viewModel: 'incorso',
    controller: 'incorso',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        itemdblclick:'onitemdblclick',
        'checkcolumn':'checkColumn'
    }
});