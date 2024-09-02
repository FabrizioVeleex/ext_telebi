/**
 * Created by luca on 16/02/2017.
 */
Ext.define('webord.view.grids.notifiche.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'webord.view.grids.notifiche.Controller',
        'webord.view.grids.notifiche.Model'
    ],
    viewModel: 'v1-notifiche',
    controller: 'v1-notifiche',
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