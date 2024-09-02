/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.voci.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.voci.Controller',
        'amm.view.grids.voci.Model'
    ],
    viewModel: 'voci',
    controller: 'voci',
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