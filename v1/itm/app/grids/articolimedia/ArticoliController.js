/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolimedia.ArticoliController', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.itm-v1-grid-articolimedia',
  requires: [
    'Ext.form.field.Tag',
    'Ext.form.field.ComboBox',
    'Ext.grid.column.Action',
    'Ext.grid.column.Date',
    'itm.forms.articolo.ArticoloPanel',

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
    let btnPreview = Ext.create('Ext.button.Button', {
      text: Locale.t('itm.grids.articoli.btn.preview.text'),
      handler: 'onTogglePreview',
      ui: 'blue',
      iconCls: ' x-fas fa-image',
      bind: {
        text: '{textBtnImageShow}'
      },
    })
    this.toolbar.add({ handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' })
    this.toolbar.add(btnPreview)

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
                metadata.tdAttr = `data-qtip="${Locale.t('itm.grids.articoli.column.legame_padre')}"`;
                return "bd-action-null x-fas fa-link bd-color-blue";
              }
              return "bd-action-null ";
            },
          },
        ],
      },
      {
        text: Locale.t('itm.grids.articoli_sito.column.creationdate'),
        dataIndex: 'creationdate',
        width: 180,
        minWidth: 180,
        xtype: 'datecolumn',
        format: 'd/m/Y H:i:s',
        filter: { type: 'date', dateFormat: 'c' } //Y-m-d
      },
      { text: Locale.t('itm.grids.articoli.column.cd_art'), dataIndex: 'cd_art', minWidth: 150, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.articoli.column.descrizione'), dataIndex: 'descrizione', minWidth: 200, flex: 1, filter: { type: 'string' } },
      {
        text: Locale.t('itm.grids.articoli_media.column.tot_img'),
        dataIndex: 'tot_img',
        maxWidth: 100,
        minWidth: 100,
        menuDisabled: true,
        resizable: false,
      },
      {
        text: Locale.t('itm.grids.articoli_media.column.tot_pdf'),
        dataIndex: 'tot_pdf',
        maxWidth: 100,
        minWidth: 100,
        menuDisabled: true,
        resizable: false,
      },
      {
        text: Locale.t('itm.grids.articoli_media.column.tot_video'),
        dataIndex: 'tot_video',
        maxWidth: 100,
        minWidth: 100,
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
  onBeforeLoadStore: function (store) {
    if (Ext.global.Vars.confMod.grids.articoli_media) {
      if (store.sorters && store.sorters.items.length === 1) {
        Ext.global.Vars.confMod.grids.articoli_media.sort = {
          name: store.sorters.items[0]._id,
          dir: store.sorters.items[0]._direction
        }
        this.setConfMod()
      } else {
        if (Ext.global.Vars.confMod.grids.articoli_media.sort) {
          store.sort(Ext.global.Vars.confMod.grids.articoli_media.sort.name, Ext.global.Vars.confMod.grids.articoli_media.dir)
        }
      }
    }
  },
  onAddFilterMedia: function (node) {
    if (node.data.id_media) {
      let me = this,
        vm = me.getViewModel(),
        store = vm.getStore('store');
      store.getProxy().extraParams.id_media = Ext.encode(node.data.id_media);
      store.load();
    }
  },
  onFilterSelectToolBar: function (combo, rec) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('store'),
      store_fam = vm.getStore('storeFiltriFamiglie'),
      store_gruppi = vm.getStore('storeFiltriGruppi'),
      store_sottogruppi = vm.getStore('storeFiltriSottoGruppi'),
      filtri = vm.get('filtri');

    store_fam.getProxy().extraParams.filtri = Ext.encode(filtri);
    store_gruppi.getProxy().extraParams.filtri = Ext.encode(filtri);
    store_sottogruppi.getProxy().extraParams.filtri = Ext.encode(filtri);


    if (combo.itemId === 'id_clm') {
      filtri.id_fam = [];
      filtri.id_gruppi = [];
      filtri.id_sottogruppi = [];
      this.toolbarFiltri.down('#id_fam').setValue([])
      this.toolbarFiltri.down('#id_gruppo').setValue([])
      this.toolbarFiltri.down('#id_sottogruppo').setValue([])
    }

    if (combo.itemId === 'id_fam') {
      filtri.id_gruppi = [];
      filtri.id_sottogruppi = [];
      this.toolbarFiltri.down('#id_gruppo').setValue([])
      this.toolbarFiltri.down('#id_sottogruppo').setValue([])
    }
    if (combo.itemId === 'id_gruppo') {
      filtri.id_sottogruppi = [];
      this.toolbarFiltri.down('#id_sottogruppo').setValue([])
    }

    Ext.global.Vars.confMod.grids.articoli.filtri = filtri

    store.getProxy().extraParams.filtri = Ext.encode(filtri);
    store.load();
    this.setConfMod()
  },
  onAlterTitle: function (text) {
    this.getViewModel().set('titolo', text)

  },
  onTogglePreview: function (btn) {
    Ext.global.Vars.confMod.grids.articoli_sito.preview = !Ext.global.Vars.confMod.grids.articoli_sito.preview
    let main = btn.up('app-main');
    main.getViewModel().set('hiddenImage', Ext.global.Vars.confMod.grids.articoli_sito.preview)
    this.onActivateGrid()
    this.setConfMod()
  },
  onActivateGrid: function () {
    if (!Ext.global.Vars.confMod.grids.articoli_sito.preview) {
      this.getViewModel().set('textBtnImageShow', 'Nascondi immagine')
    } else {
      this.getViewModel().set('textBtnImageShow', 'Visualizza Immagine')
    }
  },
  onSelectionChange: function (view, selected) {
    if (!Ext.global.Vars.confMod.grids.articoli_sito.preview) {
      let main = this.getView().up('app-main');
      let contr = main.getController()
      if (selected.length === 1) {
        Ext.Ajax.request({
          url: Backend.REST_API + "grids/articoli/getImage/",
          method: "POST",
          jsonData: {
            record: selected[0].data,
          },
          success: function (response) {
            let r = response.responseText;
            let r1 = Ext.decode(r)
            contr.previewImg.setSrc(r1.img)
          },
          failure: function (response) {
            contr.previewImg.setSrc('')
          },
        });
      } else {
        contr.previewImg.setSrc('')
      }
    }
  }
})