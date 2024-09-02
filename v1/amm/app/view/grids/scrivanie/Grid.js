/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.scrivanie.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.scrivanie.Controller',
        'amm.view.grids.scrivanie.Model'
    ],
    viewModel: 'scrivanie',
    controller: 'scrivanie',
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
        itemdblclick:'onitemdblclick'
    }
});