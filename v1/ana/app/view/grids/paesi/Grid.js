/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.paesi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.paesi.Model',
        'ana.view.grids.paesi.Controller'
    ],
    viewModel: 'paesi',
    controller: 'paesi',
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