/**
 * Created by luke on 26/01/21.
 */
Ext.define('ntf.view.grids.notifiche.Grid', {
    extend: 'Ext.grid.GridPanel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.filters.Filters',
        'Ext.ux.PreviewPlugin',
        'ntf.view.grids.notifiche.Controller',
        'ntf.view.grids.notifiche.Model'
    ],
    viewModel: 'notifiche',
    controller: 'notifiche',
    multiSelect:true,
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    forceFit: true,
    autoLoad:true,

    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true
    },
    plugins: [
        {
            ptype: 'gridfilters',
            menuFilterText: 'Filtri'
        },
        {
            pluginId: 'notifichePreview',
            ptype: 'preview',
            bodyField: 'motivazione',
            previewExpanded: false
        }],
    columns: [
        {text:Locale.t('ntf.grids.azioni.column.datanotifica'), dataIndex: 'timenotifica', width:150,xtype: 'datecolumn',format: 'd/m/Y H:i', filter: {type: 'date',dateFormat: 'Ymd'}},
        {text:Locale.t('ntf.grids.azioni.column.utente'), dataIndex: 'utente',width:180, filter: {type: 'string'}},
        {text:Locale.t('ntf.grids.azioni.column.descrizione'), dataIndex: 'descrizione',flex:1,minWidth:150, filter: {type: 'string'}},
        {text:Locale.t('ntf.grids.azioni.column.modulo'),dataIndex: 'titolo',width:150, filter: {type: 'string'}},
        {text:Locale.t('ntf.grids.azioni.column.stato'),dataIndex: 'flageseguito',width:80, sortable:false},
        {text:Locale.t('ntf.grids.azioni.column.dataeseguito'), dataIndex: 'timeeseguito', width:150,xtype: 'datecolumn',format: 'd/m/Y H:i', filter: {type: 'date',dateFormat: 'Ymd'}}
    ],
    listeners:{
      //  itemdblclick:'onitemdblclick',
        'checkColumn':'checkColumn'
    }
});