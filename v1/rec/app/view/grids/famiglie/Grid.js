/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.famiglie.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'Ext.grid.ActionColumn',
        'rec.view.grids.famiglie.Controller',
        'rec.view.grids.famiglie.Model'
    ],
    viewModel: 'famiglie',
    controller: 'famiglie',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text:Locale.t('rec.grids.famiglie.column.famiglia'), dataIndex: 'famiglia', flex:1}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});