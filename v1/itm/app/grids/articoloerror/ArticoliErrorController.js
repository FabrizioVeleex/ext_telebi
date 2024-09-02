/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolierror.ArticoliErrorController', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.itm-v1-grid-articolierror',
  requires: [
    'Ext.form.field.Tag',
    'Ext.form.field.ComboBox',
    'Ext.grid.column.Action',
    'Ext.grid.column.Date',
    'itm.forms.articolo.ArticoloPanel'
  ],
  init: function () {
    this.callParent(arguments);

    this.toolbar.add({ handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' })
    this.getViewModel().set('toolbar', false)

  },

  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('itm.forms.articolo.ArticoloPanel', {
      itemId: 'f' + record.data['id'],
      record: record,
      valori: {
        id: record.data['id'],
        isnew: isnew
      }
    }), view)
  },
  onafterrendergrid: function (grid) {
    grid.myColumns = [
      {
        xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
        items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
      },
      {
        xtype: "actioncolumn",
        maxWidth: 30,
        minWidth: 30,
        menuDisabled: true,
        dataIndex: "id_padre",
        resizable: false,
        items: [
          {
            getClass: function (v, metadata, r) {
              if (r.data.id_padre !== '') {
                metadata.tdAttr = `data-qtip="${Locale.t('itm.grids.articoli.column.legamepadre')}"`;
                return "bd-action-null x-fas fa-link bd-color-blue";
              }
              return "bd-action-null ";
            },
          },
        ],
      },
      {
        xtype: "actioncolumn",
        maxWidth: 30,
        minWidth: 30,
        menuDisabled: true,
        dataIndex: "pubblica_sito",
        resizable: false,
        items: [
          {
            getClass: function (v, metadata, r) {
              if (r.data.pubblica_sito === 1) {
                metadata.tdAttr = `data-qtip="${Locale.t('itm.grids.articoli.column.pubblica_sito')}"`;
                return "bd-action-null x-fas fa-globe y-icon-color-orange";
              }
              return "bd-action-null ";
            },
          },
        ],
      },
      { text: Locale.t('itm.grids.articoli.column.cd_stato'), dataIndex: 'stato', width: 40, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.cd_art'), dataIndex: 'cd_art', minWidth: 150, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_clm'), dataIndex: 'descr_clm', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_fam'), dataIndex: 'descr_fam', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_gruppo'), dataIndex: 'descr_gruppo', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_sottogruppo'), dataIndex: 'descr_sottogruppo', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descrizione'), dataIndex: 'descrizione', minWidth: 200, flex: 1, filter: { type: 'string' } },

      // { text: Locale.t('itm.grids.articoli.column.dateupdate'), dataIndex: 'dateupdate', width: 200, xtype: 'datecolumn', format: 'd/m/Y H:i:s' },
    ]
    this.callParent(arguments)
  },

  onAddFilterStato: function (node) {
    if (node.data.id_stato) {
      let me = this,
        vm = me.getViewModel(),
        store = vm.getStore('store');
      store.getProxy().extraParams.id_stato = Ext.encode(node.data.id_stato);
      store.load();
    }


  },
  onFilterSelectToolBar: function (combo, rec) {
    // let me = this,
    //   vm = me.getViewModel(),
    //   store = vm.getStore('store'),
    //   store_fam = vm.getStore('storeFiltriFamiglie'),
    //   store_gruppi = vm.getStore('storeFiltriGruppi'),
    //   store_sottogruppi = vm.getStore('storeFiltriSottoGruppi'),
    //   filtri = vm.get('filtri');

    // store_fam.getProxy().extraParams.filtri = Ext.encode(filtri);
    // store_gruppi.getProxy().extraParams.filtri = Ext.encode(filtri);
    // store_sottogruppi.getProxy().extraParams.filtri = Ext.encode(filtri);


    // if (combo.itemId === 'id_clm') {
    //   filtri.id_fam = [];
    //   filtri.id_gruppi = [];
    //   filtri.id_sottogruppi = [];
    //   this.toolbarFiltri.down('#id_fam').setValue([])
    //   this.toolbarFiltri.down('#id_gruppo').setValue([])
    //   this.toolbarFiltri.down('#id_sottogruppo').setValue([])
    // }

    // if (combo.itemId === 'id_fam') {
    //   filtri.id_gruppi = [];
    //   filtri.id_sottogruppi = [];
    //   this.toolbarFiltri.down('#id_gruppo').setValue([])
    //   this.toolbarFiltri.down('#id_sottogruppo').setValue([])
    // }
    // if (combo.itemId === 'id_gruppo') {
    //   filtri.id_sottogruppi = [];
    //   this.toolbarFiltri.down('#id_sottogruppo').setValue([])
    // }

    // store.getProxy().extraParams.filtri = Ext.encode(filtri);
    // store.load();
  },
  onAlterTitle: function (text) {
    this.getViewModel().set('titolo', text)
  }
})