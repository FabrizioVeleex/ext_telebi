/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articoli.ArticoliController', {
  extend: 'portal.v1.view.grids.DefaultController',
  alias: 'controller.itm-v1-grid-articoli',
  mixins: [
    'renaudo_itm.grids.articoli.Controller',
    'telebi_itm.grids.articoli.Controller',
    'portal.v1.global.Util'
  ],
  requires: [
    'Ext.form.field.Tag',
    'Ext.form.field.ComboBox',
    'Ext.grid.column.Action',
    'Ext.grid.column.Date',
    'itm.forms.articolo.ArticoloPanel'
  ],
  init: function () {
    this.callParent(arguments);
    let me = this,
      vm = me.getViewModel()
    if (!Ext.global.Vars.confMod.grids.articoli) {
      Ext.global.Vars.confMod.articoli = {
        filtri: {}
      }
    }

    this.toolbar.add({ handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' })

    this.getViewModel().set('toolbar', false)

    if (Ext.global.Vars.infoCli.cli === 'renaudo') {
      this.renaudo_init();
    }
    if (Ext.global.Vars.infoCli.cli === 'telebi') {
      this.telebi_init();
    }
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
                metadata.tdAttr = `data-qtip="${Locale.t('itm.grids.articoli.column.legame_padre')}"`;
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
      { text: Locale.t('itm.grids.articoli.column.cd_art'), dataIndex: 'cd_art', minWidth: 150, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_clm'), dataIndex: 'descr_clm', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_fam'), dataIndex: 'descr_fam', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_gruppo'), dataIndex: 'descr_gruppo', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descr_sottogruppo'), dataIndex: 'descr_sottogruppo', minWidth: 200, flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descrizione'), dataIndex: 'descrizione', minWidth: 200, flex: 1, filter: { type: 'string' } },
      {
        text: Locale.t('itm.grids.articoli_sito.column.tot_atr'),
        dataIndex: 'tot_atr',
        maxWidth: 80,
        minWidth: 80,
        menuDisabled: true,
        resizable: false,
      },
      // { text: Locale.t('itm.grids.articoli.column.dateupdate'), dataIndex: 'dateupdate', width: 200, xtype: 'datecolumn', format: 'd/m/Y H:i:s' },
    ]

    // Verifico se ci sono filtri
    if (Ext.global.Vars.confMod.grids.articoli && Ext.global.Vars.confMod.grids.articoli.filtri) {
      const filtri = Ext.global.Vars.confMod.grids.articoli.filtri
      this.getViewModel().set('filtri', filtri)
      this.getViewModel().getStore('store').getProxy().extraParams.filtri = Ext.encode(filtri);
    }
    this.callParent(arguments)
  },
  onBeforeLoadStore: function (store, operation, e) {
    if (Ext.global.Vars.confMod.grids.articoli) {
      if (store.sorters && store.sorters.items.length === 1) {
        Ext.global.Vars.confMod.grids.articoli.sort = {
          name: store.sorters.items[0]._id,
          dir: store.sorters.items[0]._direction
        }
        this.setConfMod()
      } else {
        if (Ext.global.Vars.confMod.grids.articoli.sort) {
          store.sort(Ext.global.Vars.confMod.grids.articoli.sort.name, Ext.global.Vars.confMod.grids.articoli.dir)
        }
      }
    }
  },
})