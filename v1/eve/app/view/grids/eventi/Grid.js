/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.view.grids.eventi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'eve.view.grids.eventi.Controller',
        'eve.view.grids.eventi.Model'
    ],
    viewModel: 'eventi',
    controller: 'eventi',
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