/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.stabilimenti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.stabilimenti.Controller',
        'amm.view.grids.stabilimenti.Model'
    ],
    viewModel: 'stabilimenti',
    controller: 'stabilimenti',
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