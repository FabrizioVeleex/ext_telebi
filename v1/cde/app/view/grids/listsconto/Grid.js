/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.grids.listsconto.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'cde.view.grids.listsconto.Controller',
        'cde.view.grids.listsconto.Model',
    ],
    viewModel: 'v1-cde-listsconto',
    controller: 'v1-cde-listsconto',
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