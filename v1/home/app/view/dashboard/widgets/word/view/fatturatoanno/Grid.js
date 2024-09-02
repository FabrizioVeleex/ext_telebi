/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.fatturatoanno.Grid', {
    extend: 'Ext.grid.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.util.Format',
        'home.view.dashboard.widgets.word.view.fatturatoanno.Controller',
        'home.view.dashboard.widgets.word.view.fatturatoanno.Model'
    ],
    controller:'v1-wordfatturatoanno',
    viewModel:'v1-wordfatturatoanno',
    closable:true,
    ui:'viola',
    bind: {
        store: '{storeFatturatoAnno}'
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
        {text: Locale.t('word.dettaglio.mese'), width:80, dataIndex: 'mese',resizable: false, draggable: false,filter: {type: 'numeric'}},
        {text: Locale.t('word.dettaglio.fatture'), width: 150, dataIndex: 'fatturato', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {text: Locale.t('word.dettaglio.notec'), width: 150, dataIndex: 'notecredito', align: 'right', summaryType: 'sum'
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