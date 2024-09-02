/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.Grid', {
    extend: 'Ext.grid.Panel',
    //xtype: 'v1-word-res-gridcli',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.RowWidget',
        'Ext.util.Format',
        'home.view.dashboard.widgets.word.view.residuo.Controller',
        'home.view.dashboard.widgets.word.view.residuo.Model'
    ],
    ui:'viola',
    controller: 'v1-wordresiduo',
    viewModel: 'v1-wordresiduo',
    closable:true,
    dockedItems: [
        {
            xtype:'toolbar',
            reference:'toolbarTop',
            dock: 'top',
            items: []
        }
    ],
    bind: {
        store: '{storeResiduo}'
    },
    features: [{ftype: 'summary', dock: 'bottom'}],
    multiSelect: false,
    viewConfig: {
        listeners: {
            //evento x espandi items
            expandbody: function (nodes, record) {
                //comprimo quelle aperte
                let vm = this.lookupViewModel()
                let storedettaglio=vm.get('storeResiduoDettaglio')
                let ctrl = this.lookupController()
                let grid = ctrl.getView()
                //disabilito il radiobutton x impedire cambio con riga espansa
                let raggruppamento=ctrl.raggruppamento
                if (raggruppamento) {
                     raggruppamento.disable()
                }
                let avviso=ctrl.avviso
                if (avviso) {
                    avviso.show()
                }
                let rowExpander = grid.getPlugin('gridResDettaglio');
                let expandedRecords = rowExpander.recordsExpanded;
                let currentExpandedRecord;
                let currentInternalId = 0; // start from 1
                let currentIndex = -1; // start from 0
                for(let prop in expandedRecords) {
                    if(expandedRecords.hasOwnProperty(prop)) {
                        currentInternalId = parseInt(prop, 10);
                        if (record.internalId!==currentInternalId) {
                            currentExpandedRecord = grid.store.getByInternalId(currentInternalId);
                            currentIndex = grid.store.indexOf(currentExpandedRecord);
                            rowExpander.toggleRow(currentIndex, currentExpandedRecord);
                        }
                    }
                }
                if (storedettaglio) {
                    storedettaglio.removeAll() //rimuovo eventuali records
                    storedettaglio.getProxy().extraParams.cdart=record.data.cdart
                    storedettaglio.getProxy().extraParams.cdcli=record.data.codcli
                    storedettaglio.getProxy().extraParams.cdfam=record.data.cdfam
                    storedettaglio.getProxy().extraParams.tipo=vm.get('tipogrid')
                    storedettaglio.getProxy().extraParams.colonna=vm.get('colonna')
                    storedettaglio.getProxy().extraParams.linea=vm.get('linea')
                    storedettaglio.getProxy().extraParams.cliente=vm.get('cliente')
                    storedettaglio.load()
                }
            },
            collapsebody:function() {
                let ctrl = this.lookupController(), vm = this.lookupViewModel()
                //disabilito il radiobutton x impedire cambio con riga espansa
                let raggruppamento=ctrl.raggruppamento
                if (raggruppamento) {
                    raggruppamento.enable()
                }
                let avviso=ctrl.avviso
                if (avviso) {
                    avviso.hide()
                }
                let storedettaglio=vm.get('storeResiduoDettaglio')
                storedettaglio.removeAll()
            }
        }
    },
    plugins: [{ptype: 'gridfilters', menuFilterText: 'Filtri'},
        {ptype:'rowwidget',id:'gridResDettaglio',
            widget: {
                xtype: 'grid',
                scrollable:'y',
                dockedItems: [
                    {
                        xtype:'toolbar',
                        //reference:'toolbarTop',
                        dock: 'top',
                        items: []
                    }
                ],
                bind: {
                    store: '{storeResiduoDettaglio}',
                    title:''
                },
                columns: [
                    {text:Locale.t('word.dettaglio.cliente'), dataIndex: 'cliente',flex:1},
                    {text:Locale.t('word.dettaglio.articolo'), dataIndex: 'articolo',flex:1},
                    {text:Locale.t('word.dettaglio.qta'), dataIndex: 'qta',width:120,
                        renderer: function (v) {
                            return Ext.util.Format.number(v, '0,000');
                        }
                    },
                    {text:Locale.t('word.dettaglio.residuo88'), dataIndex: 'residuo88',width:130,
                        renderer: function (v) {
                            return Ext.util.Format.currency(v, '€ ', 2);
                        },
                    },
                    {text:Locale.t('word.dettaglio.residuo99'), dataIndex: 'residuo99',width:130,
                        renderer: function (v) {
                            return Ext.util.Format.currency(v, '€ ', 2);
                        },
                    },
                    {text:Locale.t('word.dettaglio.residuo98'), dataIndex: 'residuo98',width:130,
                        renderer: function (v) {
                            return Ext.util.Format.currency(v, '€ ', 2);
                        },
                    },
                    {text:Locale.t('word.dettaglio.residuo97'), dataIndex: 'residuo97',width:130,
                        renderer: function (v) {
                            return Ext.util.Format.currency(v, '€ ', 2);
                        },
                    },
                    {text:Locale.t('word.dettaglio.totale'), dataIndex: 'totale',width:130,
                        renderer: function (v) {
                            return Ext.util.Format.currency(v, '€ ', 2);
                        },
                    },
                    {text:'', dataIndex: 'ragscoexp',width:10,hidden:true}, //x esportazioni
                    {text:'', dataIndex: 'cdcliexp',width:10,hidden:true},
                    {text:'', dataIndex: 'cdcomexp',width:10,hidden:true},
                ]

            }
        }
    ],
    columns: [
        {
            text: Locale.t('word.dettaglio.cdfam'),
            flex:1,
            dataIndex: 'cdfam',
            draggable: false,
            hidden:true,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.famiglia'),
            flex:1,
            dataIndex: 'famiglia',
            draggable: false,
            hidden:true,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.cdart'),
            width: 150,
            dataIndex: 'cdart',
            draggable: false,
            hidden:true,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.cdcom1'),
            width: 150,
            dataIndex: 'cdcom1',
            draggable: false,
            hidden:true,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.descart'),
            flex:1,
            dataIndex: 'descart',
            draggable: false,
            hidden:true,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.qta'),
            width: 120,
            dataIndex: 'qta',
            draggable: false,
            hidden:true,
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">'+tmp+'</span>'
            }
        },
        {
            text: Locale.t('word.dettaglio.codcli'),
            width: 70,
            dataIndex: 'codcli',
            draggable: false,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.ragsoc'),
            flex: 1,
            dataIndex: 'ragsoc',
            draggable: false,
            filter: {type: 'string'}
        },
        {
            text: Locale.t('word.dettaglio.residuo88'),
            width: 130,
            dataIndex: 'residuo88',
            draggable: false,
            align: 'right',
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {
            text: Locale.t('word.dettaglio.residuo99'),
            width: 130,
            dataIndex: 'residuo99',
            draggable: false,
            align: 'right',
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {
            text: Locale.t('word.dettaglio.residuo98'),
            width: 130,
            dataIndex: 'residuo98',
            draggable: false,
            align: 'right',
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {
            text: Locale.t('word.dettaglio.residuo97'),
            width: 130,
            dataIndex: 'residuo97',
            draggable: false,
            align: 'right',
            summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.currency(v, '€ ', 2);
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        },
        {
            text: Locale.t('word.dettaglio.residuotot'),
            width: 130,
            dataIndex: 'residuo',
            draggable: false,
            align: 'right',
            summaryType: 'sum',
            renderer: function (v) {
                let valore = Ext.util.Format.currency(v, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + valore + '</span>';
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.currency(value, '€ ', 2);
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>';
            }
        }
    ],
    listeners: {
        afterRender: 'onAfterRender'
    }
});