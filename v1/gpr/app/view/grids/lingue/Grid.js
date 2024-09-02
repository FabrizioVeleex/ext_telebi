/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.lingue.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gpr.view.grids.lingue.Controller',
        'gpr.view.grids.lingue.Model'
    ],
    viewModel: 'lingue',
    controller: 'lingue',
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