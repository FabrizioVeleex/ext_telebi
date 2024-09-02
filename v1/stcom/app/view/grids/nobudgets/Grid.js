/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.view.grids.nobudgets.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'stcom.view.grids.nobudgets.Controller',
        'stcom.view.grids.nobudgets.Model'
    ],
    viewModel: 'nobudgets',
    controller: 'nobudgets',
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