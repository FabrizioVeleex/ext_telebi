/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.modelli.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.modelli.Controller',
        'fmc.view.grids.modelli.Model'
    ],
    viewModel: 'modelli',
    controller: 'modelli',
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