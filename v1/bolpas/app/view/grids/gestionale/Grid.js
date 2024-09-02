/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.gestionale.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolpas.view.grids.gestionale.Controller',
        'bolpas.view.grids.gestionale.Model'
    ],
    viewModel: 'gestionale',
    controller: 'gestionale',
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