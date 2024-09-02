/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.chiusi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.chiusi.Model',
        'rec.view.grids.chiusi.Controller'
    ],
    viewModel: 'chiusi',
    controller: 'chiusi',
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