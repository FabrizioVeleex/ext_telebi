/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.funzioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gpr.view.grids.funzioni.Controller',
        'gpr.view.grids.funzioni.Model'
    ],
    viewModel: 'funzioni',
    controller: 'funzioni',
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