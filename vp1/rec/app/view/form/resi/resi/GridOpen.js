/**
 * Created by fabrizio on 19/03/17.
 */
Ext.define('recpub.view.form.resi.resi.GridOpen', {
    extend: 'Ext.grid.GridPanel',
    requires:[
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.plugin.RowWidget',
        'recpub.view.form.resi.resi.StoreOpen'
    ],
    autoLoad:true,
    minHeight:150,
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        enableTextSelection: true,
        listeners: {
            //evento x espandi items
            expandbody: function (nodes, record) {
                //comprimo quelle aperte
                let vm = this.lookupViewModel()
                let storedettaglio=vm.get('storeDettaglio')
                let ctrl = this.lookupController()
                let grid = ctrl.panelOpen
                let rowExpander = grid.getPlugin('gridettrecplg');
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
                    storedettaglio.getProxy().extraParams.idtestata=record.data.id
                    storedettaglio.load()
                }
            }
        }
    },
    plugins: [
        {ptype:'rowwidget',id:'gridettrecplg',
            widget: {
                xtype: 'grid',
                scrollable:'y',
                bind: {
                    store: '{storeDettaglio}',
                    title:''
                },
                columns: [
                    { text: Locale.t("recpub.grids.articoli.columns.cdars"), width: 100, menuDisabled: true, dataIndex: "cdars" },
                    { text: Locale.t("recpub.grids.articoli.columns.depar"),  flex: 1, menuDisabled: true, dataIndex: "depar" },
                    { text: Locale.t("recpub.grids.articoli.columns.causale"), flex:1, menuDisabled: true, dataIndex: "causale" },
                    { text: Locale.t("recpub.grids.articoli.columns.nrbos"), width: 90, menuDisabled: true, dataIndex: "nrbos" },
                    {
                        text: Locale.t("recpub.grids.articoli.columns.dtbos"),
                        width: 100,
                        menuDisabled: true,
                        dataIndex: "dtbos",
                        xtype: "datecolumn",
                        format: "d/m/Y",
                    },
                    //{text: Locale.t('recpub.grids.articoli.columns.qta'), width:60, menuDisabled: true, dataIndex: 'qta'},
                    { text: Locale.t("recpub.grids.articoli.columns.dossier"), width: 100, menuDisabled: true, dataIndex: "pcdos" }
                ]
            }
        }
    ],
    columns: [
        {text:Locale.t('recpub.grids.resi.columns.datadoc'), dataIndex: 'datadoc', width: 200, xtype: 'datecolumn', format: 'd/m/Y'},
        {text:Locale.t('recpub.grids.resi.columns.progressivo'), dataIndex: 'progressivo', width:200},
        {text:Locale.t('recpub.grids.resi.columns.stato'), dataIndex: 'stato', flex:1}
    ],
    listeners:{
        afterRender:'onAfterRenderGrid'
    },
    initComponent: function () {
        this.store = Ext.create('recpub.view.form.resi.resi.StoreOpen');
        this.callParent(arguments)
    }
});