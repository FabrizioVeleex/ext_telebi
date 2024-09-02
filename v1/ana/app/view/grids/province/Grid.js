/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.province.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.province.Model',
        'ana.view.grids.province.Controller'
    ],
    viewModel: 'province',
    controller: 'province',
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