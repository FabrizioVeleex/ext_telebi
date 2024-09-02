/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.widgets.watt.view.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    multiSelect: false,
    forceFit: false,
    viewConfig: {
        emptyText: 'Nessun record presente'
    },
    itemId:'watt',
    listeners:{
        afterRender: 'onAfterRenderGrid',
        itemdblclick:'onitemdblclick',
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow'
    }
});
