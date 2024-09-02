/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.verifiche.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.verifiche.Controller',
        'fmc.view.grids.verifiche.Model'
    ],
    viewModel: 'verifiche',
    controller: 'verifiche',
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
        itemdblclick:'onitemdblclick',
        'checkcolumn':'checkColumn'
    }
});