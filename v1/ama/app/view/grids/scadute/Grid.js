/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.view.grids.scadute.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ama.view.grids.scadute.Controller',
        'ama.view.grids.scadute.Model'
    ],
    viewModel: 'scadute',
    controller: 'scadute',
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