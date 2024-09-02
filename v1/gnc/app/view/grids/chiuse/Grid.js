/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.chiuse.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gnc.view.grids.chiuse.Controller',
        'gnc.view.grids.chiuse.Model'
    ],
    viewModel: 'chiuse',
    controller: 'chiuse',
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
        itemdblclick:'onitemdblclick',
        'checkcolumn':'checkColumn'
    }
});