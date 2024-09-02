/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.Gridfam', {
    extend: 'Ext.grid.Panel',
    xtype:'v1-wordResfam',
    requires:[
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.util.Format',
        'home.view.dashboard.widgets.word.view.residuo.Controller',
        'home.view.dashboard.widgets.word.view.residuo.Model'
    ],
    controller:'v1-wordresiduo',
    viewModel:'v1-wordresiduo',
    closable:false,
    bind: {
        store: '{storeResiduofam}'
    },
    features: [{ftype: 'summary', dock: 'bottom'}],
    multiSelect: false,
    viewConfig: {emptyText: 'Nessun record presente', deferEmptyText: false},
    plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    columns: [
        {text: Locale.t('word.dettaglio.famiglia'), flex:1, dataIndex: 'famiglia',draggable: false,filter: {type: 'string'}},
        {text: Locale.t('word.dettaglio.residuo88'), width: 120, dataIndex: 'residuo88', draggable: false,align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {text: Locale.t('word.dettaglio.residuo99'), width: 120, dataIndex: 'residuo99',draggable: false, align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {text: Locale.t('word.dettaglio.residuo98'), width: 110, dataIndex: 'residuo98',draggable: false, align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {text: Locale.t('word.dettaglio.residuo97'), width: 110, dataIndex: 'residuo97',draggable: false, align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {text: Locale.t('word.dettaglio.residuotot'), width: 100, dataIndex: 'residuo', draggable: false,align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                let valore = Ext.util.Format.currency(v, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + valore + '</span>';
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        }
    ],
    listeners:{
       // afterRender:'onAfterRender'
    }
});