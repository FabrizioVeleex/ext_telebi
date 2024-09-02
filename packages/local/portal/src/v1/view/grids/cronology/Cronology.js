Ext.define('portal.v1.view.grids.cronology.Cronology', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.ux.PreviewPlugin',
        'Ext.grid.filters.Filters',
        'portal.util.Locale',
        'portal.v1.view.grids.cronology.Controller',
        'portal.v1.view.grids.cronology.Model',
    ],
    controller:'cronology-v1',
    viewModel: 'cronology-v1',
    flex:1,
    viewConfig: {
        emptyText: Locale.t('global.cronology.emptytext'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        stripeRows:true
    },
    title:Locale.t('global.cronology.title'),
    bind:{
        store:'{store}'
    },
    plugins: [{
        pluginId: 'notePreview',
        ptype: 'preview',
        bodyField: 'note',
        previewExpanded: false,

    },{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    columns: [
        {
            text: Locale.t('global.cronology.datalog'),
            dataIndex: 'datelog',
            width: 160,
            xtype:'datecolumn',
            format:'d/m/Y H:i:s',
            filter: {type: 'date',dateFormat: 'c'}
        },
        {
            text: Locale.t('global.cronology.azionelog'),
            dataIndex: 'log',
            flex: 1,
            renderer: function (value, meta, record) {
                return Ext.String.format('<div class="topic"><b>{0}</b> - <span class="author">{1}</span></div>', value, record.data.username)
            }
        }
    ],
    listeners:{
        popolate:'onPopolateModel',
        onTogle:'onTogle',
        reoladStore:'reoladStore',
    }

});