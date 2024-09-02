/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.resi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolpas.view.grids.resi.Controller',
        'bolpas.view.grids.resi.Model'
    ],
    viewModel: 'resi',
    controller: 'resi',
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