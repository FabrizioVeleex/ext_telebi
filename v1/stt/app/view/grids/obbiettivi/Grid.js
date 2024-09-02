/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.grids.obbiettivi.Grid', {
    extend: 'Ext.grid.GridPanel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.column.Date',
        'stt.view.grids.obbiettivi.Controller',
        'stt.view.grids.obbiettivi.ViewModel'
    ],
    viewModel: 'v1-stt-obbiettivi',
    controller: 'v1-stt-obbiettivi',
    forceFit: true,
    autoLoad: true,
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            minWidth: 30,
            menuDisabled: true,
            resizable: false,
            items: [{
                handler: 'onOpen',
                iconCls: 'x-fas fa-eye',
                tooltip: Locale.t('global.btn.open.text')
            }]
        },
        {
            text: 'Cliente',
            width: 150,
            dataIndex: "cd_sogg_fat",
        },
        {
            text: '2018',
            width: 70,
            dataIndex: "2018",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: '2019',
            width: 70,
            dataIndex: "2019",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: '2020',
            width: 70,
            dataIndex: "2020",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: '2021',
            width: 70,
            dataIndex: "2021",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: '2022',
            width: 70,
            dataIndex: "2022",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: 'media',
            tdCls: 'bold-column',
            width: 70,
            dataIndex: "media",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: 'max',
            tdCls: 'bold-column',
            width: 70,
            dataIndex: "max",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: 'pmagg',
            width: 70,
            dataIndex: "magg",
            xtype: 'numbercolumn', format: '0,000'
        },
        {
            text: 'obb.',
            tdCls: 'bold-column',
            width: 70,
            dataIndex: "obbiettivo",
            xtype: 'numbercolumn', format: '0,000'
        },
    ],
    listeners: {
        itemdblclick: 'onitemdblclick',
        itemcontextmenu: 'onItemContextMenu',
    }
});

