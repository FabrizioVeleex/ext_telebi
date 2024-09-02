/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.attesa.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolpas.view.grids.attesa.Controller',
        'bolpas.view.grids.attesa.Model'
    ],
    viewModel: 'attesa',
    controller: 'attesa',
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