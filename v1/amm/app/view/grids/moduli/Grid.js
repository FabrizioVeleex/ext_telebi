/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.moduli.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.moduli.Controller',
        'amm.view.grids.moduli.Model'
    ],
    viewModel: 'moduli',
    controller: 'moduli',
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