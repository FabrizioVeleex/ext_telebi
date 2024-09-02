/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.generali.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.generali.Controller',
        'rec.view.grids.generali.Model'
    ],
    viewModel: 'generali',
    controller: 'generali',
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