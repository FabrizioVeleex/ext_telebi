/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.note.Grid', {
    extend: 'Ext.grid.Panel',
    xtype:'v1-pre-gridNote',
    requires:[
        'Ext.grid.column.Action',
        'Ext.util.Format'
    ],
    multiSelect: false,
    viewConfig: {emptyText: '', deferEmptyText: false},
    columns: [
        {width:25,align:'center',groupable: false,xtype:'actioncolumn', items:[
            {getClass:function( v, meta, r ) {
                return 'x-fas fa-trash bd-color-red';
            }
            }
        ]},

        {text: Locale.t('wpre.giustificativi.dipendente'),
            flex: 1, dataIndex: 'nominativo',
        },
        {text: Locale.t('wpre.giustificativi.dal'),
            width: 120, dataIndex: 'notedal',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        },
        {text: Locale.t('wpre.giustificativi.al'),
            width: 120, dataIndex: 'noteal',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        }
    ],
    listeners:{
        cellclick:'oncellclick',
    }
});
