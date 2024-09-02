/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.sospesi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vda.view.grids.sospesi.Controller',
        'vda.view.grids.sospesi.Model'
    ],
    viewModel: 'v1-sospesi',
    controller: 'v1-sospesi',
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