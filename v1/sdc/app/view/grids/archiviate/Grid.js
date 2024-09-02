/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.archiviate.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.archiviate.Model',
        'sdc.view.grids.archiviate.Controller'
    ],
    viewModel: 'archiviate',
    controller: 'archiviate',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners:{
        itemdblclick:'onitemdblclick',
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow'
    }
});