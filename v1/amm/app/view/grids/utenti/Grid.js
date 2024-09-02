/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.utenti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.utenti.Controller',
        'amm.view.grids.utenti.Model'
    ],
    viewModel: 'utenti',
    controller: 'utenti',
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