/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.posizioni.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.posizioni.Model',
        'ana.view.grids.posizioni.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'posizioni',
    controller: 'posizioni',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text: Locale.t('ana.grids.posizioni.column.posizione'), dataIndex: 'posizione', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});