/**
 * Created by luke on 27/09/21.
 */
Ext.define('stcom.view.forms.articoli.cards.GridArticoli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.feature.Summary',
        'Ext.grid.plugin.RowWidget',
        'Ext.util.Format'
    ],
    multiSelect: false,
    autoLoad: true,
    bind: {
        store: "{storeArticoli}",
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        listeners: {
            //evento x espandi items
            expandbody: function (nodes, record) {
                //comprimo quelle aperte
                let vm = this.lookupViewModel()
                let storedettaglio=vm.get('storeClientiDettaglio')
                let ctrl = this.lookupController()
                let grid = ctrl.gridArticoli
                let rowExpander = grid.getPlugin('clientiDettaglio');
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
                    storedettaglio.getProxy().extraParams.cdcli = vm.get('cdcli')
                    storedettaglio.getProxy().extraParams.tipocli = vm.get('tipocli')
                    storedettaglio.getProxy().extraParams.capoarea = vm.get('capoarea')
                    storedettaglio.getProxy().extraParams.nazione = vm.get('nazione')
                    storedettaglio.getProxy().extraParams.regione =  vm.get('regione')
                    storedettaglio.getProxy().extraParams.mese = vm.get('mese')
                    storedettaglio.load()
                }
            }
        }
    },
    features: [{ftype: 'summary', dock: 'top'}],
    plugins:[
        {ptype:'rowwidget',id:'clientiDettaglio',
            widget: {
                xtype: 'grid',
                scrollable:'y',
                dockedItems: [
                    {
                        xtype:'toolbar',
                        dock: 'top',
                        items: []
                    }
                ],
                features: [{ftype: 'summary', dock: 'top'}],
                bind: {
                    store: '{storeClientiDettaglio}',
                    title:''
                },
                columns: [
                    {text:Locale.t('stcom.grids.articoli.gridclienti.cdcli'), dataIndex: 'cdcli',width:150},
                    {text:Locale.t('stcom.grids.articoli.gridclienti.ragsoc'), dataIndex: 'ragsoc',flex:1},
                    {dataIndex: 'vendcorso',width:150,align: 'right',summaryType: 'sum',
                        renderer: function (v) {
                            return Ext.util.Format.number(v, '0,000');
                        }, summaryRenderer: function (value) {
                            let tmp = Ext.util.Format.number(value, '0,000');
                            return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                        },
                        bind:{
                            text:"{vendcorso}"
                        }
                    },
                    {text:Locale.t('stcom.grids.articoli.gridclienti.perc'),width:80, dataIndex: "perc",align: 'right',sortable:false,
                        renderer: function (v) {
                            let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0})
                            return tmp.replace(',','.')
                        },
                    },
                    {dataIndex: 'vendprec',width:150,align: 'right',summaryType: 'sum',
                        renderer: function (v) {
                            return Ext.util.Format.number(v, '0,000');
                        },summaryRenderer: function (value) {
                            let tmp = Ext.util.Format.number(value, '0,000');
                            return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                        },
                        bind:{
                            text:"{vendprec}"
                        }
                    },
                    {dataIndex: 'vendold',width:150,align: 'right',summaryType: 'sum',
                        renderer: function (v) {
                            return Ext.util.Format.number(v, '0,000');
                        },summaryRenderer: function (value) {
                            let tmp = Ext.util.Format.number(value, '0,000');
                            return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                        },
                        bind:{
                            text:"{vendold}"
                        }
                    }
                ]
            }
        }
    ],
    columns: [
        {text: Locale.t("stcom.grids.articoli.columns.clm"), width: 100, dataIndex: "clm"},
        {text: Locale.t("stcom.grids.articoli.columns.cdart"), width: 150, dataIndex: "cdart"},
        {text: Locale.t("stcom.grids.articoli.columns.cdcom1"), width: 150, dataIndex: "cdcom1"},
        {text: Locale.t("stcom.grids.articoli.columns.descart"), flex:1, dataIndex: "descart"},
        {text: '', width: 150, dataIndex: "vendcorso",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
        },
        {text: Locale.t("stcom.grids.articoli.columns.perc"), width:80, dataIndex: "perc",align: 'right',sortable:false,
            renderer: function (v) {
                let tmp=Number(v / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 0})
                return tmp.replace(',','.')
            }
        },
        {text: '', width: 150, dataIndex: "vendprec",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }},
        {text: '', width: 150, dataIndex: "vendold",align: 'right',summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            }, summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }}
    ]
});