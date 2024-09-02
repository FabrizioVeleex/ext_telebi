/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.view.grids.schede.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'eve.view.grids.schede.Controller',
        'eve.view.grids.schede.Model'
    ],
    viewModel: 'schede',
    controller: 'schede',
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