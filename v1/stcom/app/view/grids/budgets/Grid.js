/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.view.grids.budgets.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'stcom.view.grids.budgets.Controller',
        'stcom.view.grids.budgets.Model'
    ],
    viewModel: 'budgets',
    controller: 'budgets',
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