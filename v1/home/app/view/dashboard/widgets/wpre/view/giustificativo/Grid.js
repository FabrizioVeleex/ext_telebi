/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.giustificativo.Grid', {
    extend: 'Ext.grid.Panel',
    xtype:'v1-wpre-gridGiust',

    requires: [
        'Ext.util.Format'
    ],

    multiSelect: false,
    viewConfig: {emptyText: '', deferEmptyText: false},
    columns: [
        {text: Locale.t('wpre.giustificativi.dal'),
            width: 120, dataIndex: 'dal',
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
        {text: Locale.t('wpre.giustificativi.al'),
            width: 120, dataIndex: 'al',
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
        {text:Locale.t('wpre.giustificativi.giustificativo'),flex:1,
            dataIndex: 'giustificazione'
        }
    ]
});
