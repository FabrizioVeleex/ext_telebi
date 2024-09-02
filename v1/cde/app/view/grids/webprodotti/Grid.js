/**
 * Created by luke on 30/01/21.
 */
Ext.define('cde.view.grids.webprodotti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'Ext.grid.ActionColumn',
        'cde.view.grids.webprodotti.Controller',
        'cde.view.grids.webprodotti.Model'
    ],
    viewModel: 'v1-webprodotti',
    controller: 'v1-webprodotti',
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
        {text: Locale.t('cde.grids.webprodotti.column.cdcli'), dataIndex: 'cdcli', width:150, filter: {type: 'string'}},
        {text: Locale.t('cde.grids.webprodotti.column.ragsoc'), dataIndex: 'ragsoc', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});