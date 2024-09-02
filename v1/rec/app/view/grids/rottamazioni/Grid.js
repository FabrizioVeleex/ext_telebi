/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.rottamazioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.rottamazioni.Controller',
        'rec.view.grids.rottamazioni.Model'
    ],
    viewModel: 'rottamazioni',
    controller: 'rottamazioni',
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