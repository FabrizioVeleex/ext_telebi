/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.grids.destinatari.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'fmc.view.grids.destinatari.Controller',
        'fmc.view.grids.destinatari.Model'
    ],
    viewModel: 'destinatari',
    controller: 'destinatari',
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