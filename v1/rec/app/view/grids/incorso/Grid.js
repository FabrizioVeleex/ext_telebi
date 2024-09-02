/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.incorso.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.incorso.Model',
        'rec.view.grids.incorso.Controller'
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