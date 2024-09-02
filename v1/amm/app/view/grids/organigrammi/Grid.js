/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.organigrammi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'amm.view.grids.organigrammi.Controller',
        'amm.view.grids.organigrammi.Model'
    ],
    viewModel: 'organigrammi',
    controller: 'organigrammi',
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