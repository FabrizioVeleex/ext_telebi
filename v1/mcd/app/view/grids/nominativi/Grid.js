/**
 * Created by luke on 2019-06-03.
 */
Ext.define('mcd.view.grids.nominativi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'mcd.view.grids.nominativi.Model',
        'mcd.view.grids.nominativi.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'nominativi',
    controller: 'nominativi',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [{xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,
        items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
    },
        {text: Locale.t('mcd.grids.nominativi.column.dip_nome'), dataIndex: 'dip_nome', flex:1,filter: {type: 'string'}}
    ],
    listeners:{
        itemdblclick:'onitemdblclick'
    }
});