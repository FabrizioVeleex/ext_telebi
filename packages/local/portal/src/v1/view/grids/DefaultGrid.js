Ext.define('portal.v1.view.grids.DefaultGrid', {
    extend: 'Ext.grid.GridPanel',
    requires: [
        'Ext.grid.filters.Filters',
        'portal.util.Locale'
    ],
    // forceFit: true,
    autoLoad: true, //autoLoad = false non funziona se è attivato il pligin gridfilters #baco conosciuto

    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
    },
    plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    listeners:{
        afterrender:'onafterrendergrid'
    }
});
