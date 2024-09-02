/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.zone.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.zone.Model',
        'ana.view.grids.zone.Controller'
    ],
    viewModel: 'zone',
    controller: 'zone',
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