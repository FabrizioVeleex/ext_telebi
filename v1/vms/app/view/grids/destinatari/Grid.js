/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.destinatari.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vms.view.grids.destinatari.Controller',
        'vms.view.grids.destinatari.Model'
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