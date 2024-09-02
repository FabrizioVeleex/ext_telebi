/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.view.grids.incorso.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gnc.view.grids.incorso.Controller',
        'gnc.view.grids.incorso.Model'
    ],
    viewModel: 'incorso',
    controller: 'incorso',
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