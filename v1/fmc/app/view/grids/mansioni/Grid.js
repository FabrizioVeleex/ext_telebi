/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.mansioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.mansioni.Controller',
        'fmc.view.grids.mansioni.Model'
    ],
    viewModel: 'mansioni',
    controller: 'mansioni',
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