/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.view.grids.incorso.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ama.view.grids.incorso.Controller',
        'ama.view.grids.incorso.Model'
    ],
    viewModel: 'incorso',
    controller: 'incorso',
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