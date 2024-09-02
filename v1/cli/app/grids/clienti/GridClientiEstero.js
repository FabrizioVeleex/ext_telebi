/**
 * Created by luke on 09/12/22.
 */
Ext.define('cli.grids.clienti.GridClientiEstero', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'cli.grids.clienti.Controller',
        'cli.grids.clienti.ViewModel'
    ],
    viewModel: 'v1-clienti',
    controller: 'v1-clienti',
    bind: {
        store: '{storeClientiEstero}',
        title: '{titoloClientiEstero}'
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