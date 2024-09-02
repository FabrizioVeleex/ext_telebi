/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.bolle.nuove.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolfor.grids.bolle.BolleController',
        'bolfor.grids.bolle.BolleViewModel'
    ],
    viewModel: 'v1-bolfor-bolle',
    controller: 'v1-bolfor-bolle',
    bind: {
        store: '{storeNuove}',
        title: '{titolonuove}'
    },
    columns: [],
    listeners: {
        columnresize: 'onResizeColumn',
        columnmove: 'onColumnMove',
        columnhide: 'onColumnhide',
        columnShow: 'onColumnshow',
        itemdblclick: 'onitemdblclick',
        'checkcolumn':'checkColumn'
    }
});