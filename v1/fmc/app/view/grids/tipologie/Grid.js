/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.tipologie.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.tipologie.Controller',
        'fmc.view.grids.tipologie.Model'
    ],
    viewModel: 'tipologie',
    controller: 'tipologie',
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