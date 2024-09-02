/**
 * Created by luca on 16/02/2017.
 */
Ext.define('renaudo_itm.grids.articoli.Controller', {
  renaudo_init: function () {

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
    this.toolbar.add(btnPreview)

    this.toolbarFiltri = Ext.create("Ext.Toolbar", {
      dock: 'top',
      scrollable: true,
      defaults: {
        xtype: 'tagfield',
        minWidth: 230,
        flex: 1,
        labelAlign: 'top',
        queryMode: 'remote',
        forceSelection: true,
        multiSelect: true,
        encodeSubmitValue: true,
        autoLoadOnValue: true,
        minChars: 2,
        listeners: {
          select: "onFilterSelectToolBar",
          beforequery: function (qe) {
            delete qe.combo.lastQuery;
          }
        },
      },
      items: [
        {
          fieldLabel: Locale.t('itm.grids.articoli.filtri.classi'),
          displayField: 'descr_clm', valueField: 'id', value: '',
          itemId: 'id_clm',
          bind: {
            store: '{storeFiltriClasse}',
            value: '{filtri.id_clm}'
          },
        },
        {
          fieldLabel: Locale.t('itm.grids.articoli.filtri.famiglie'),
          displayField: 'descr_fam', valueField: 'id', value: '',
          itemId: 'id_fam',
          bind: {
            store: '{storeFiltriFamiglie}',
            value: '{filtri.id_fam}'
          },
        },
        {
          fieldLabel: Locale.t('itm.grids.articoli.filtri.gruppi'),
          displayField: 'descr_gruppo', valueField: 'id', value: '',
          itemId: 'id_gruppo',
          bind: {
            store: '{storeFiltriGruppi}',
            value: '{filtri.id_gruppi}'
          },
        },
        {
          fieldLabel: Locale.t('itm.grids.articoli.filtri.sottogruppi'),
          displayField: 'descr_sottogruppo', valueField: 'id', value: '',
          itemId: 'id_sottogruppo',
          bind: {
            store: '{storeFiltriSottoGruppi}',
            value: '{filtri.id_sottogruppi}'
          }
        },
        {
          fieldLabel: Locale.t('itm.grids.articoli.filtri.marche'),
          displayField: 'descr_marca', valueField: 'id', value: '',
          itemId: 'id_marca',
          bind: {
            store: '{storeFiltriMarche}',
            value: '{filtri.id_marche}'
          }
        }
      ]
    })

    this.getView().addDocked(this.toolbarFiltri)
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
      if (contr.previewImg && selected.length === 1) {
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