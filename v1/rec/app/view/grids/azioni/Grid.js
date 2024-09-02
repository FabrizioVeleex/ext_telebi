/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.azioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.azioni.Controller',
        'rec.view.grids.azioni.Model'
    ],
    viewModel: 'azioni',
    controller: 'azioni',
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
})