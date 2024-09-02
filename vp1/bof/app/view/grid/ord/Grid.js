/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ord.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: [
    "Ext.grid.column.Action",
    "Ext.grid.column.Date",
    'Ext.grid.Panel',
    'Ext.grid.plugin.RowWidget',
    'bofpub.view.grid.ord.Controller',
    'bofpub.view.grid.ord.ViewModel'
  ],
  controller: "ord",
  viewModel: "ord",
  minHeight: 150,
  title: "Ordini",
  height: 600,
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  viewConfig: {
    listeners: {
      //evento x espandi items
      expandbody: function (nodes, record) {
        //comprimo quelle aperte
        let vm = this.lookupViewModel()
        let storedettaglio=vm.get('storeDettaglio')
        let ctrl = this.lookupController()
        let grid = ctrl.getView()
        let rowExpander = grid.getPlugin('gridettplg');
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
          storedettaglio.getProxy().extraParams.so=record.data.so
          storedettaglio.getProxy().extraParams.tipo_spool=record.data.tipo_spool
          storedettaglio.load()
        }
      }
    }
  },
  plugins: [
    {ptype: 'gridfilters', menuFilterText: 'Filtri', emptyFilterText: ''},
    {ptype:'rowwidget',id:'gridettplg',
      widget: {
        xtype: 'grid',
        scrollable:'y',
        bind: {
          store: '{storeDettaglio}',
          title:''
        },
        columns: [
          {text:Locale.t('bofpub.grids.ord.dettaglio.cdpar'), dataIndex: 'cdpar',width:300},
          {text:Locale.t('bofpub.grids.ord.dettaglio.descrizione'), dataIndex: 'descrizione',flex:1},
          {text:Locale.t('bofpub.grids.ord.dettaglio.qta_ord'), dataIndex: 'qta_ord',width:300}
        ]
      }
    }
  ],
  columns: [
    {
      xtype: "actioncolumn",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      width: 30,
      items: [
        {
          getClass: function (v, metadata,rec) {
            if (rec.data.so === 'XA' && rec.data.spool === 0) {
              return null
            }
            return "x-fas fa-file-pdf bd-color-red";
          },
          tooltip: Locale.t("global.btn.pdf.tooltip"),
          typeFile: "pdf",
          tag: "ORD",
          handler: "onDownloadFile",
        },
      ],
    },
    {
      xtype: "actioncolumn",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      width: 30,
      items: [
        {
          getClass: function () {
            return "x-fas fa-file-excel bd-color-green"
          },
          tooltip: Locale.t("global.btn.xlsx.tooltip"),
          typeFile: "xlsx",
          tag: "ORD",
          handler: "onDownloadFile",
        },
      ],
    },
    { text: Locale.t("bofpub.grids.columns.year"), dataIndex: "year", width: 90 },
    { text: Locale.t("bofpub.grids.columns.num_doc"), dataIndex: "num_doc", width: 90, filter: { type: "string" } },
    {text: Locale.t("bofpub.grids.columns.data_doc"), dataIndex: "data_doc", width: 100, xtype: "datecolumn", format: "d/m/Y", filter: { type: "date", dateFormat: "Ymd" }},
    { text: Locale.t("bofpub.grids.columns.descrizione"), dataIndex: "descrizione", flex: 1, filter: { type: "string" } }
  ]
});
