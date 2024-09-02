/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.annullati.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vda.view.grids.annullati.Controller',
        'vda.view.grids.annullati.Model'
    ],
    viewModel: 'v1-annullati',
    controller: 'v1-annullati',
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