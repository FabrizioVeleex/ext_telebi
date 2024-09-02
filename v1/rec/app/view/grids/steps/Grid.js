/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.steps.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.steps.Controller',
        'rec.view.grids.steps.Model'
    ],
    viewModel: 'steps',
    controller: 'steps',
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