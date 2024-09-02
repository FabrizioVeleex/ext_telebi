/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    multiSelect: false,
    requires: [
        'Ext.button.Button',
        'home.view.dashboard.widgets.wpre.view.main.fields.SearchDate',
        'home.view.dashboard.widgets.wpre.view.main.fields.SearchDip',
        'home.view.dashboard.widgets.wpre.view.main.fields.SearchSede'
    ],
    viewConfig: {
        emptyText: Locale.t('global.grid.store.empty')
    },
    flex: 1,
    columns:[

    ],
    dockedItems: [
        {xtype: 'toolbar', dock: 'top',
        reference:'widgetpretoolbar',
        items: [
            {xtype: 'button', iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
            {xtype: 'v1-wpre-searchdate'},
            {xtype: 'v1-wpre-searchdip'}
        ]
        },
        {xtype: 'toolbar', dock: 'top', reference:'widgetpretoolbar2',hidden:true,
            items: [
                {xtype: 'v1-wpre-sede'}
            ]
        }
    ],
});
