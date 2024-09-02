/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.ordinato.Grid', {
    extend: 'Ext.grid.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.util.Format',
        'home.view.dashboard.widgets.word.view.ordinato.Controller',
        'home.view.dashboard.widgets.word.view.ordinato.Model'
    ],
    controller:'v1-wordordinato',
    viewModel:'v1-wordordinato',
    closable:true,
    ui:'viola',
    bind: {
        store: '{storeOrdini}'
    },
    features: [{ftype: 'summary', dock: 'bottom'}],
    multiSelect: false,
    viewConfig: {emptyText: 'Nessun record presente', deferEmptyText: false},
    plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    dockedItems: [
        {xtype: "toolbar", dock: "top",
            items: [
                {xtype: 'button', ui:'blue',iconCls: 'x-fas fa-file-excel',text: '',handler: 'onExcel'}
            ]
        }
    ],
    columns: [
        {text: Locale.t('word.dettaglio.cdart'), width: 100, dataIndex: 'cdart',hidden:true,resizable: false, draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.descart'), flex:1, dataIndex: 'descart',hidden:true,resizable: false, draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.qta'), width: 100, dataIndex: 'qta',hidden:true,resizable: false, draggable: false,
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
            }
        },
        {text: Locale.t('word.dettaglio.codcli'), width: 100, dataIndex: 'codcli',resizable: false, draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.ragsoc'), flex:1, dataIndex: 'ragsoc',resizable: false, draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.importo'), width: 200, dataIndex: 'importo', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});