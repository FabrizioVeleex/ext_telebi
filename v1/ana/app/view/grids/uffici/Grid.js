/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.uffici.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'ana.view.grids.uffici.Model',
        'ana.view.grids.uffici.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'uffici',
    controller: 'uffici',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text: Locale.t('ana.grids.uffici.column.ufficio'), dataIndex: 'ufficio', flex:1, filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});