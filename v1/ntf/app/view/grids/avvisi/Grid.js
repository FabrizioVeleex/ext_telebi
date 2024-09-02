/**
 * Created by luke on 26/01/21.
 */
Ext.define('ntf.view.grids.avvisi.Grid', {
    extend: 'Ext.grid.GridPanel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.filters.Filters',
        'Ext.ux.PreviewPlugin',
        'ntf.view.grids.avvisi.Controller',
        'ntf.view.grids.avvisi.Model'
    ],
    viewModel: 'avvisi',
    controller: 'avvisi',
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
            pluginId: 'avvisiPreview',
            ptype: 'preview',
            bodyField: 'motivazione',
            previewExpanded: false
        }],
    columns: [
        {text:Locale.t('ntf.grids.avvisi.column.datanotifica'), dataIndex: 'timenotifica', width:150,xtype: 'datecolumn',format: 'd/m/Y H:i', filter: {type: 'date',dateFormat: 'Ymd'}},
        {text:Locale.t('ntf.grids.avvisi.column.utente'), dataIndex: 'utente',width:180, filter: {type: 'string'}},
        {text:Locale.t('ntf.grids.avvisi.column.descrizione'), dataIndex: 'descrizione',flex:1,minWidth:150, filter: {type: 'string'}},
        {text:Locale.t('ntf.grids.avvisi.column.modulo'), dataIndex: 'titolo',width:150, filter: {type: 'string'}},
        {text:Locale.t('ntf.grids.avvisi.column.stato'), dataIndex: 'flagletto',width:80, sortable:false},
        {text:Locale.t('ntf.grids.avvisi.column.dataletto'), dataIndex: 'timeletto', width:150,xtype: 'datecolumn',format: 'd/m/Y H:i', filter: {type: 'date',dateFormat: 'Ymd'}}
    ],
    listeners:{
      //  itemdblclick:'onitemdblclick',
        checkColumn:'checkColumn'
    }
});