/**
 * Created by luke on 30/01/21.
 */
Ext.define('websrv.view.grids.assoricambi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'Ext.grid.ActionColumn',
        'websrv.view.grids.assoricambi.Controller',
        'websrv.view.grids.assoricambi.Model'
    ],
    viewModel: 'assoricambi',
    controller: 'assoricambi',
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
            tooltip: Locale.t('global.btn.openrecord')
        }]
    },
        {text: Locale.t('websrv.grids.assoricambi.columns.cdcli'), dataIndex: 'cdcli', width:150, filter: {type: 'string'}},
        {text: Locale.t('websrv.grids.assoricambi.columns.ragsoc'), dataIndex: 'ragsoc', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});