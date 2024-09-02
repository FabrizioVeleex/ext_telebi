/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.descrizioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gpr.view.grids.descrizioni.Controller',
        'gpr.view.grids.descrizioni.Model'
    ],
    viewModel: 'descrizioni',
    controller: 'descrizioni',
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