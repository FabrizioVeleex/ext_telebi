/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.view.grids.archivio.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'mcd.view.grids.archivio.Controller',
        'mcd.view.grids.archivio.Model'
    ],
    viewModel: 'archivio',
    controller: 'archivio',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    multiSelect:true,
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        itemdblclick:'onitemdblclick'
    }
});