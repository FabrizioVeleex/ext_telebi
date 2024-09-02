/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.codifica.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolpas.view.grids.codifica.Controller',
        'bolpas.view.grids.codifica.Model'
    ],
    viewModel: 'codifica',
    controller: 'codifica',
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