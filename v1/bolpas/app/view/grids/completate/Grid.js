/**
 * Created by luca on 16/02/2017.
 */
Ext.define('bolpas.view.grids.completate.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolpas.view.grids.completate.Controller',
        'bolpas.view.grids.completate.Model'
    ],
    viewModel: 'completate',
    controller: 'completate',
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