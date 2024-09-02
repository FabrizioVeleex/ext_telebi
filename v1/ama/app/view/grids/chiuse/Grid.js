/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.view.grids.chiuse.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ama.view.grids.chiuse.Controller',
        'ama.view.grids.chiuse.Model'
    ],
    viewModel: 'chiuse',
    controller: 'chiuse',
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