/**
 * Created by fabrizio on 30/11/16.
 */
Ext.define('home.view.widgets.wvoi.GridAndamento', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    features: [{ftype: 'summary', dock: 'bottom'}],
    viewConfig: {
        emptyText: 'Nessun record presente'
    },
    columns: {
        items: [{xtype: 'actioncolumn', width: 30, align: 'center',
            items: [{

                    getClass: function (v, meta, rec) {
                        return 'x-fas fa-eye';
                    },
                    handler: 'onOpenWindowDettaglio'}
             ]},
            {text: Locale.t('widgetvoice.columngrid.user'), width: 130, dataIndex: 'user', renderer: 'onRenderUser'},
            {text: Locale.t('widgetvoice.columngrid.totm'), width: 120, dataIndex: 'totm',renderer: 'onRenderOre'},
            {text: Locale.t('widgetvoice.columngrid.ordini'), width: 100, dataIndex: 'ordini',align:'right',summaryType: 'sum'
                ,summaryRenderer: function (value, summaryData, dataIndex) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            },
            {text: Locale.t('widgetvoice.columngrid.righe'), width: 100, dataIndex: 'righe',align:'right',summaryType: 'sum'
                ,summaryRenderer: function (value, summaryData, dataIndex) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            },
            {text: Locale.t('widgetvoice.columngrid.pezzi'), width: 100, dataIndex: 'pezzi', align:'right',summaryType: 'sum',renderer: 'onRenderPz'
                ,summaryRenderer: function (value, summaryData, dataIndex) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            },
            {text: Locale.t('widgetvoice.columngrid.mediapzord'), width: 130, dataIndex: 'mediapzord',align:'right', renderer: 'onRenderMedia'},
            {text: Locale.t('widgetvoice.columngrid.mediapzora'), width: 130, dataIndex: 'mediapzora',align:'right', renderer: 'onRenderMedia'}
        ],
        defaults:{
            hideable: false,
            sortable:false,
            draggable: false,
            resizable: false,
            menuDisabled: true
        }
    }
});