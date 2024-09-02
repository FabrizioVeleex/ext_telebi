/**
 * Created by luke on 09/12/22.
 */
Ext.define('cde.view.grids.notifiche.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'cde.view.grids.notifiche.Controller',
        'cde.view.grids.notifiche.Model'
    ],
    viewModel: 'v1-grid-notifiche',
    controller: 'v1-grid-notifiche',
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