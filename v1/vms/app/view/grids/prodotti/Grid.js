/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.prodotti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vms.view.grids.prodotti.Controller',
        'vms.view.grids.prodotti.Model'
    ],
    viewModel: 'prodotti',
    controller: 'prodotti',
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