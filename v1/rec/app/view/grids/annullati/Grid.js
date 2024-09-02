/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.annullati.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.annullati.Model',
        'rec.view.grids.annullati.Controller'
    ],
    viewModel: 'annullati',
    controller: 'annullati',
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