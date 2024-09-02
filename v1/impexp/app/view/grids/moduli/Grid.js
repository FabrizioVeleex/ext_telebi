/**
 * Created by luca on 16/02/2017.
 */
Ext.define('impexp.view.grids.moduli.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'impexp.view.grids.moduli.Controller',
        'impexp.view.grids.moduli.Model'
    ],
    viewModel: 'moduli',
    controller: 'moduli',
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