/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.causali.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.causali.Controller',
        'rec.view.grids.causali.Model'
    ],
    viewModel: 'causali',
    controller: 'causali',
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