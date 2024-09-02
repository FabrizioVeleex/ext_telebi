/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.comuni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.comuni.Model',
        'ana.view.grids.comuni.Controller'
    ],
    viewModel: 'comuni',
    controller: 'comuni',
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