/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.stampanti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.stampanti.Controller',
        'amm.view.grids.stampanti.Model'
    ],
    viewModel: 'stampanti',
    controller: 'stampanti',
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