/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.schede.Attivi', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.schede.Controller',
        'fmc.view.grids.schede.Model'
    ],
    viewModel: 'schede',
    controller: 'schede',
    bind: {
        store: '{storeAttivi}',
        title: '{titoloAttivi}'
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