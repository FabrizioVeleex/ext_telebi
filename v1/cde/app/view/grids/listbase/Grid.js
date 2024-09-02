/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.grids.listbase.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'cde.view.grids.listbase.Controller',
        'cde.view.grids.listbase.Model',
    ],
    viewModel: 'v1-cde-listbase',
    controller: 'v1-cde-listbase',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        showHeaderCheckbox:false
    },
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        itemdblclick:'onitemdblclick',
        'checkcolumn':'checkColumn'
    }
});