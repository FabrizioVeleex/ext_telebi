/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.posizionare.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolpas.view.grids.posizionare.Controller',
        'bolpas.view.grids.posizionare.Model'
    ],
    viewModel: 'posizionare',
    controller: 'posizionare',
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