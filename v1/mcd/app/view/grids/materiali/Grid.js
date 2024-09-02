/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.view.grids.materiali.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'mcd.view.grids.materiali.Model',
        'mcd.view.grids.materiali.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'materiali',
    controller: 'materiali',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text:Locale.t('mcd.grids.materiali.column.descrizione'), dataIndex: 'descrizione', flex:1}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});