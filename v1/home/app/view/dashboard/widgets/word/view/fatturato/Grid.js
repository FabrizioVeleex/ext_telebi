/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.fatturato.Grid', {
    extend: 'Ext.grid.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.util.Format',
        'home.view.dashboard.widgets.word.view.fatturato.Controller',
        'home.view.dashboard.widgets.word.view.fatturato.Model'
    ],
    controller:'v1-wordfatturato',
    viewModel:'v1-wordfatturato',
    closable:true,
    ui:'viola',
    bind: {
        store: '{storeFatturato}'
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
        {text: Locale.t('word.dettaglio.codcli'), width: 100, dataIndex: 'codcli',resizable: false, draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.ragsoc'), flex:1, dataIndex: 'ragsoc',resizable: false, draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.fatturato'), width: 150, dataIndex: 'fatturato', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {text: Locale.t('word.dettaglio.bollettato'), width: 150, dataIndex: 'bollettato', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {text: Locale.t('word.dettaglio.evaso'), width: 150, dataIndex: 'evaso', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {text: Locale.t('word.dettaglio.residuotot'), width: 150, dataIndex: 'totriga', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                let valore = Ext.util.Format.currency(v, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + valore + '</span>';
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
            , resizable: false, draggable: false
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});