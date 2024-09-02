/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.prodotti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'gpr.view.grids.prodotti.Controller',
        'gpr.view.grids.prodotti.Model'
    ],
    viewModel: 'prodotti',
    controller: 'prodotti',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    selModel: {
        selType: 'checkboxmodel',
        showHeaderCheckbox: false,
        mode: 'MULTI',
        checkOnly:true
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