Ext.define('dip.view.grids.parametri.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.parametri.Model',
        'dip.view.grids.parametri.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'parametri',
    controller: 'parametri',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled:true,
        resizable:false,
        items: [{
            handler: 'onOpen',
            iconCls: 'x-fas fa-eye',
            tooltip: Locale.t('global.btn.open.text')
        }]
    },
        {text:Locale.t('dip.grids.parametri.column.descrizione'), dataIndex: 'descrizione', flex: 1,sortable:false}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});