/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.stati.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.stati.Model',
        'ana.view.grids.stati.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'stati',
    controller: 'stati',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text: Locale.t('ana.grids.stati.column.statosogg'), dataIndex: 'statosogg', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});