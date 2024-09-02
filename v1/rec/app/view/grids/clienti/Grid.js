/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.clienti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.clienti.Controller',
        'rec.view.grids.clienti.Model'
    ],
    viewModel: 'clienti',
    controller: 'clienti',
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