/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.controlli.Effettuati', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vms.view.grids.controlli.Controller',
        'vms.view.grids.controlli.Model'
    ],
    viewModel: 'controlli',
    controller: 'controlli',
    bind: {
        store: '{effettuatistore}',
        title: '{effettuatititle}'
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