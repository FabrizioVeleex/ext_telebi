/**
 * Created by luca on 17/07/2018.
 */
Ext.define('cde.view.grids.listnetto.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'cde.view.grids.listnetto.Controller',
        'cde.view.grids.listnetto.Model',
    ],
    viewModel: 'v1-cde-listnetto',
    controller: 'v1-cde-listnetto',
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