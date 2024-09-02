/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.interventi.Completati', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vms.view.grids.interventi.Controller',
        'vms.view.grids.interventi.Model'
    ],
    viewModel: 'interventi',
    controller: 'interventi',
    bind: {
        store: '{completatistore}',
        title: '{completatititle}'
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