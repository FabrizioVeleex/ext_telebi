/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.annullatiacg.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'rec.view.grids.annullatiacg.Model',
        'rec.view.grids.annullatiacg.Controller'
    ],
    viewModel: 'annullatiacg',
    controller: 'annullatiacg',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        showHeaderCheckbox: false,
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