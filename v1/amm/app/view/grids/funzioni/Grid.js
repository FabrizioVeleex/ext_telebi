/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.funzioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.funzioni.Controller',
        'amm.view.grids.funzioni.Model'
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