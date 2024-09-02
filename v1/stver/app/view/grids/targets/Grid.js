/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stver.view.grids.targets.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'stver.view.grids.targets.Controller',
        'stver.view.grids.targets.Model'
    ],
    viewModel: 'targets',
    controller: 'targets',
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