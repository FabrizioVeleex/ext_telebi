/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.archiviati.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.archiviati.Model',
        'rec.view.grids.archiviati.Controller'
    ],
    viewModel: 'archiviati',
    controller: 'archiviati',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        showHeaderCheckbox: false,
        checkOnly: true
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