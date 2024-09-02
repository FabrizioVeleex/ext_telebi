/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.aziende.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gpr.view.grids.aziende.Controller',
        'gpr.view.grids.aziende.Model'
    ],
    viewModel: 'aziende',
    controller: 'aziende',
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