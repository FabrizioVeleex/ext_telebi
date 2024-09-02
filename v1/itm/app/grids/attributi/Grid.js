/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.attributi.Grid', {
    extend: 'Ext.grid.GridPanel',
    requires: [
        'itm.grids.attributi.Controller',
        'itm.grids.attributi.ViewModel',
        'Ext.grid.plugin.DragDrop'
    ],
    autoLoad: true,
    viewModel: 'attributi',
    controller: 'attributi',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    viewConfig: {
        emptyText: Locale.t('itm.grids.attributi.empty'),
        getRowClass: function (record) {
            return (record.get('changed')) ? "y-changed" : "";
        },
        plugins: {
            gridviewdragdrop: {
                dragText: 'Drag and drop to reorganize'
            }
        }
    },
    columns: [],
    listeners: {
        afterrender: 'onafterrendergrid',
        columnresize: 'onResizeColumn',
        columnmove: 'onColumnMove',
        columnhide: 'onColumnhide',
        columnShow: 'onColumnshow',
        itemdblclick: 'onitemdblclick',
        beforedrop: 'onBeforeDrop',
        addFilter: "onAddFilter",
        select: 'onSelectRow'
    }
});