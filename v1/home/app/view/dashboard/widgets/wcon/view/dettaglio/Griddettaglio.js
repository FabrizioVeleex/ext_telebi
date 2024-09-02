/**
 * Created by luke on 30/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.dettaglio.Griddettaglio', {
    extend: 'Ext.grid.Panel',
    xtype:'v1-wcongridDet',
    requires:[
        'Ext.grid.feature.Summary',
        'Ext.util.Format'
    ],
    bind: {
        store: '{storeDettaglio}'
    },
    features: [{ftype: 'summary', dock: 'bottom'}],
    multiSelect: false,
    viewConfig: {emptyText: 'Nessun record presente', deferEmptyText: false}
    , columns: [
        {
            text: Locale.t('wcon.dettaglio.data'),
            width: 130,
            dataIndex: 'datadoc',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            resizable: false,
            draggable: false
        },
        {text: Locale.t('wcon.dettaglio.numero'),
            width: 100,
         dataIndex: 'numero', resizable: false, draggable: false},
        {
            text: Locale.t('wcon.dettaglio.scadenza'),
            width: 130,
            dataIndex: 'scadenza',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            resizable: false,
            draggable: false
        },
        {text: Locale.t('wcon.dettaglio.tipo'), minWidth: 100, flex:1, dataIndex: 'tipo', resizable: false, draggable: false},
        {
            text: Locale.t('wcon.dettaglio.insoluto'), width: 150, dataIndex: 'insoluto', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                if (v === 0) {
                    return '';
                } else {
                    let valore = Ext.util.Format.currency(v, '€ ', 2);
                    return '<span style=color:red;>' + valore + '</span>';
                }
            }
            , summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"color:red;font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {
            text: Locale.t('wcon.dettaglio.scaduto'), width: 150, dataIndex: 'scaduto', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                if (v === 0) {
                    return '';
                } else {
                    let valore = Ext.util.Format.currency(v, '€ ', 2);
                    return '<span style=color:red;>' + valore + '</span>';
                }
            }
            , summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"color:red;font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {
            text: Locale.t('wcon.dettaglio.credito'), width: 150, dataIndex: 'credito', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                if (v === 0) {
                    return '';
                } else {
                    let valore = Ext.util.Format.currency(v, '€ ', 2);
                    return '<span style=color:green;>' + valore + '</span>';
                }
            }
            , summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"color:green;font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        },
        {
            text: Locale.t('wcon.dettaglio.scadere'), width: 150, dataIndex: 'scadere', align: 'right', summaryType: 'sum'
            , renderer: function (v) {
                if (v === 0) {
                    return '';
                } else {
                    return Ext.util.Format.currency(v, '€ ', 2);
                }
            }
            , summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
            , resizable: false, draggable: false
        }
    ]
});