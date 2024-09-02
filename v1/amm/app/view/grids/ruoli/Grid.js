/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.ruoli.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.ruoli.Controller',
        'amm.view.grids.ruoli.Model'
    ],
    viewModel: 'ruoli',
    controller: 'ruoli',
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