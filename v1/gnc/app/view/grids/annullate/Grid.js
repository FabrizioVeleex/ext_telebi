/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.annullate.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gnc.view.grids.annullate.Controller',
        'gnc.view.grids.annullate.Model'
    ],
    viewModel: 'annullate',
    controller: 'annullate',
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