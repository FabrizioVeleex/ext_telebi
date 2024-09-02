/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.chiusi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vda.view.grids.chiusi.Controller',
        'vda.view.grids.chiusi.Model'
    ],
    viewModel: 'v1-chiusi',
    controller: 'v1-chiusi',
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