/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.respinti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.respinti.Model',
        'rec.view.grids.respinti.Controller'
    ],
    viewModel: 'respinti',
    controller: 'respinti',
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