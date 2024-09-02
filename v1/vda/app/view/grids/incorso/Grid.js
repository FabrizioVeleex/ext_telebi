/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.view.grids.incorso.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vda.view.grids.incorso.Controller',
        'vda.view.grids.incorso.Model'
    ],
    viewModel: 'v1-incorso',
    controller: 'v1-incorso',
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