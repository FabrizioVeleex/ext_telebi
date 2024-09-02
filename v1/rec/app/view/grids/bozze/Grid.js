/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.bozze.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.bozze.Model',
        'rec.view.grids.bozze.Controller'
    ],
    viewModel: 'bozze',
    controller: 'bozze',
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