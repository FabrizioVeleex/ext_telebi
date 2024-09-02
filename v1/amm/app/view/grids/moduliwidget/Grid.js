/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.moduliwidget.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.moduliwidget.Controller',
        'amm.view.grids.moduliwidget.Model'
    ],
    viewModel: 'moduliwidget',
    controller: 'moduliwidget',
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