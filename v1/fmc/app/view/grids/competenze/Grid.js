/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.competenze.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.competenze.Controller',
        'fmc.view.grids.competenze.Model'
    ],
    viewModel: 'competenze',
    controller: 'competenze',
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