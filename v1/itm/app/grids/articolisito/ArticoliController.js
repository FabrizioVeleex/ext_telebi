/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolisito.ArticoliController', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.itm-v1-grid-articolisito',
  requires: [
    'Ext.form.field.Tag',
    'Ext.form.field.ComboBox',
    'Ext.grid.column.Action',
    'Ext.grid.column.Date',
    'itm.forms.articolo.ArticoloPanel',
    'itm.grids.articolisito.gridAttributi.ArticoliStoreAttributi',
    'itm.grids.articolisito.gridAttributi.ArticoliModelAttributi',
    'itm.grids.articolisito.ArticoliWidgetGrid',
    'itm.grids.articolisito.modDescr.Windows',
  ],
  init: function () {
    this.callParent(arguments);
    let me = this,
      vm = me.getViewModel()
    if (!Ext.global.Vars.confMod.grids.articoli_sito) {
      Ext.global.Vars.confMod.grids.articoli_sito = {
        copyattr: false,
        preview: false,
        filtri: {}
      }
    }

    vm.set('pressed', Ext.global.Vars.confMod.grids.articoli_sito.preview)

    this.toolbar.add({ handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' })
    this.toolbar.add({
      text: Locale.t('itm.grids.articoli.btn.copyattr.text'),
      handler: 'onEnablePasteValues',
      ui: 'ocra',
      enableToggle: true,
      pressed: Ext.global.Vars.confMod.grids.articoli_sito.copyattr,
      iconCls: ' x-fas fa-clone'
    })

    let btnPreview = Ext.create('Ext.button.Button', {
      text: Locale.t('itm.grids.articoli.btn.preview.text'),
      handler: 'onTogglePreview',
      ui: 'blue',
      iconCls: ' x-fas fa-image',
      bind: {
        text: '{textBtnImageShow}'
      }
    })
    this.toolbar.add(btnPreview)

    this.toolbar.add({
      tooltip: Locale.t("itm.grids.articoli.btn.replace.tooltip"),
      text: Locale.t("itm.grids.articoli.btn.replace.text"),
      ui: "blue",
      disabled: true,
      iconCls: "x-fas fa-exchange",
      handler: 'onModificaDesc',
      bind: {
        disabled: "{disableFindReplace}",
      }
    })
    this.toolbar.add({
      //tooltip: Locale.t("itm.grids.articoli.btn.replace.tooltip"),
      text: "Filtro padri DISATTIVO",//Locale.t("itm.grids.articoli.btn.replace.text"),
      ui: "blue",
      stato: 0,
      iconCls: "x-fas fa-people-arrows",
      handler: 'onToggleFiltroPadre',
    })

    this.getViewModel().set('pasteAtr', Ext.global.Vars.confMod.grids.articoli_sito.copyattr)
    this.getViewModel().set('preview', Ext.global.Vars.confMod.grids.articoli_sito.preview)
    this.getViewModel().set('toolbar', false)

    this.toolbarFiltri = Ext.create("Ext.Toolbar", {
      dock: 'top',
      scrollable: true,
      defaults: {
        xtype: 'tagfield',
        minWidth: 230,
        flex: 1,
        labelAlign: 'left',
        labelWidth: 100,
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
        text: Locale.t('itm.grids.articoli_sito.column.atr_padre'),
        dataIndex: 'tot_atrp',
        maxWidth: 50,
        minWidth: 50,
        menuDisabled: true,
        resizable: false,
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
      {
        text: Locale.t('itm.grids.articoli_sito.column.tot_atr'),
        dataIndex: 'tot_atr',
        maxWidth: 80,
        minWidth: 80,
        menuDisabled: true,
        resizable: false,
      },
      { text: Locale.t('itm.grids.articoli.column.descrizione'), dataIndex: 'descrizione', minWidth: 200, flex: 1, filter: { type: 'string' } },
    ]

    // Verifico se ci sono filtri
    if (Ext.global.Vars.confMod.grids.articoli_sito && Ext.global.Vars.confMod.grids.articoli_sito.filtri) {
      const filtri = Ext.global.Vars.confMod.grids.articoli_sito.filtri
      this.getViewModel().set('filtri', filtri)
      this.getViewModel().getStore('store').getProxy().extraParams.filtri = Ext.encode(filtri);
    }
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
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('store'),
      // store_clm = vm.getStore('storeFiltriClasse'),
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

    Ext.global.Vars.confMod.grids.articoli_sito.filtri = filtri

    store.getProxy().extraParams.filtri = Ext.encode(filtri);
    store.load();
    this.setConfMod()

  },
  onBeforeLoadStore: function (store, operation, e) {
    if (Ext.global.Vars.confMod.grids.articoli_sito) {
      if (store.sorters && store.sorters.items.length === 1) {
        Ext.global.Vars.confMod.grids.articoli_sito.sort = {
          name: store.sorters.items[0]._id,
          dir: store.sorters.items[0]._direction
        }
        this.setConfMod()
      } else {
        if (Ext.global.Vars.confMod.grids.articoli_sito.sort) {
          store.sort(Ext.global.Vars.confMod.grids.articoli_sito.sort.name, Ext.global.Vars.confMod.grids.articoli_sito.dir)
        }
      }
    }
  },
  onAlterTitle: function (text) {
    this.getViewModel().set('titolo', text)
  },
  onEnablePasteValues: function (btn) {
    this.getViewModel().set('pasteAtr', btn.pressed)
    if (btn.pressed) {
      btn.setUi('orange')
    } else {
      btn.setUi('ocra')
    }
    Ext.global.Vars.confMod.grids.articoli_sito.copyattr = btn.pressed
    this.setConfMod()

  },
  onWidgetAttachSito: function (plugin, bodyComponent, record) {
    let me = this;
    bodyComponent.removeAll();

    // recupero dati reecord
    Ext.Ajax.request({
      method: "GET",
      url: Backend.REST_API + 'grids/articoli/getRowWidget/' + record.data.id,
      success: function (response) {
        const obj = Ext.decode(response.responseText);
        me.nextRequest(obj, bodyComponent, record.data, record);
      },
      failure: function () {
        try {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });
  },
  nextRequest: function (obj, bodyComponent, record, row) {

    if (!obj && obj.length === 0) {
      console.log('errore caricamento dati')
      return
    }
    // recupero info
    let me = this;

    bodyComponent.copyAttributi = [];
    bodyComponent.copyAttributi = [];
    bodyComponent.descrizione_estesa = obj.data.descrizione_estesa
    bodyComponent.descrizione = obj.data.descrizione
    bodyComponent.id_art = obj.data.id
    bodyComponent.item = obj
    bodyComponent.current_record = record
    bodyComponent.current_row = row

    bodyComponent.storeAttributiListAtr = Ext.create('itm.grids.articolisito.gridAttributi.ArticoliStoreAttributi')
    bodyComponent.storeAttributiListAtr.loadData(obj.data.storeAttributiListAtr)
    bodyComponent.storeAttributiListAtr.add(Ext.create('itm.grids.articolisito.gridAttributi.ArticoliModelAttributi', {
      action: 1, isnew: 1, id: me.randomString(32), id_art: obj.data.id, id_atr: '', valore: '', attributo: ''
    }))

    bodyComponent.gridAttributiListAtr = Ext.create('itm.grids.articolisito.gridAttributi.ArticoliWidgetGridListAtr', {
      flex: 1,
      store: bodyComponent.storeAttributiListAtr
    })

    bodyComponent.storeAttributi = Ext.create('itm.grids.articolisito.gridAttributi.ArticoliStoreAttributi')
    bodyComponent.storeAttributi.loadData(obj.data.storeAttributi)
    bodyComponent.storeAttributi.add(Ext.create('itm.grids.articolisito.gridAttributi.ArticoliModelAttributi', {
      action: 1, isnew: 1, id: me.randomString(32), id_art: obj.data.id, id_atr: '', valore: '', attributo: ''
    }))

    bodyComponent.gridAttributi = Ext.create('itm.grids.articolisito.gridAttributi.ArticoliWidgetGrid', {
      flex: 1,
      store: bodyComponent.storeAttributi
    })

    bodyComponent.pnlRow = Ext.create('itm.grids.articolisito.ArticoliWidgetForm', {
      items: [
        {
          xtype: 'textfield',
          hidden: true,
          itemId: 'cd_art',
          value: bodyComponent.cd_art
        },
        {
          xtype: 'container', bodyStyle: 'background-color:trasparent',
          layout: {
            type: 'hbox', align: 'stretch'
          },
          items: [
            {
              xtype: 'textfield',
              fieldLabel: Locale.t('itm.forms.articolo.fields.descrizione'),
              enableKeyEvents: true,
              itemId: 'descrizione',
              maxLength: 72,
              flex: 1, padding: '0 0 10 0',
              labelWidth: 150,
              value: bodyComponent.descrizione,
              listeners: {
                keyup: 'onKeyupField',
              },
              triggers: {
                foo: {
                  cls: 'y-copy',
                  tooltip: 'Copia descrizione',// Locale.t('global.btn.save.text'),
                  handler: 'onCopyDescrizione'
                },
                bar: {
                  cls: 'y-paste',
                  tooltip: 'Incolla descrizione',// Locale.t('global.btn.save.text'),
                  handler: 'onPasteRowDescrizione'
                }
              }
            },
          ]
        },
        {
          xtype: 'container', bodyStyle: 'background-color:trasparent',
          layout: {
            type: 'hbox', align: 'stretch'
          },
          items: [
            {
              xtype: 'htmleditor', flex: 1,
              autoScroll: true, style: 'font-size:14px;', userCls: 'ID_' + bodyComponent.id_art, itemId: 'descrizione_estesa',
              style: {
                marginTop: '-5px'
              },
              value: bodyComponent.descrizione_estesa,
              listeners: {
                change: 'onChangeHtml'
              },
            },
            {
              xtype: 'container',
              width: 10
            },
            bodyComponent.gridAttributi
          ]
        }
      ]
    })

    bodyComponent.pnlRowListAtr = Ext.create('itm.grids.articolisito.ArticoliWidgetGrid', {
      heigth: 250,
      items: [
        {
          xtype: 'displayfield',
          hidden: true,
          itemId: 'cd_art',
          value: bodyComponent.cd_art
        },
        {
          xtype: 'container', bodyStyle: 'background-color:trasparent',
          layout: {
            type: 'hbox', align: 'stretch'
          },
          items: [
            {
              xtype: 'displayfield',
              fieldLabel: Locale.t('itm.forms.articolo.fields.descrizione'),
              flex: 1, padding: '0 0 10 0',
              labelWidth: 150,
              value: bodyComponent.descrizione,
            },
          ]
        },
        bodyComponent.gridAttributiListAtr
      ]
    })

    bodyComponent.panelCard = Ext.create("Ext.panel.Panel", {
      layout: "card",
      items: [
        bodyComponent.pnlRow,
        bodyComponent.pnlRowListAtr
      ]
    })
    bodyComponent.add(bodyComponent.panelCard)
  },
  onAfterRenderWidgetForm: function (panel) {
    let container = panel.up('#widgetContainer');
    panel.down('#btnCopyHtml').setText(container.item.data.length_descrizione_estesa)
  },
  onAfterRenderGridAttributi: function (grid) {
    // Gestione rasti ordinamento personalizzato

    let container = grid.up('#widgetContainer');
    let info_atr = grid.down('#info_atr');
    let btn_atr_sorting = grid.down('#btn_atr_sorting')
    let btn_atr_sorting_remove = grid.down('#btn_atr_sorting_remove')

    info_atr.setTooltip(container.item.data.sorting_info)
    btn_atr_sorting.setHidden(container.item.data.sorting_art)
    btn_atr_sorting_remove.setHidden(!container.item.data.sorting_art)

  },
  onAfterRenderGridAttributiListAtr: function (grid) {
    // Gestione rasti ordinamento personalizzato
    // let container = grid.up('#widgetContainer');
    // let info_atr = grid.down('#info_atr');
    // let btn_atr_sorting = grid.down('#btn_atr_sorting')
    // let btn_atr_sorting_remove = grid.down('#btn_atr_sorting_remove')

    // info_atr.setTooltip(container.item.data.sorting_info)
    // btn_atr_sorting.setHidden(container.item.data.sorting_art)
    // btn_atr_sorting_remove.setHidden(!container.item.data.sorting_art)

  },
  onActiveSortingAtr: function (btn) {
    let container = btn.up('#widgetContainer'),
      btn_atr_sorting = container.down('#btn_atr_sorting'),
      btn_atr_sorting_remove = container.down('#btn_atr_sorting_remove');

    Ext.Ajax.request({
      method: "POST",
      url: Backend.REST_API + 'grids/articoli/setSortingAtr',
      jsonData: { id: container.id_art },
      success: function (response) {
        container.item.data.sorting_art = true;
        btn_atr_sorting.setHidden(true)
        btn_atr_sorting_remove.setHidden(false)
      },
      failure: function (response) {
        try {
          //TODO gestire messaggi di errore
          const record = Ext.decode(response.responseText);
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });

  },
  onRemoveSortingAtr: function (btn) {
    let container = btn.up('#widgetContainer'),
      btn_atr_sorting = container.down('#btn_atr_sorting'),
      btn_atr_sorting_remove = container.down('#btn_atr_sorting_remove');

    Ext.Ajax.request({
      method: "DELETE",
      url: Backend.REST_API + 'grids/articoli/deleteSortingAtr',
      jsonData: { id: container.id_art },
      success: function (response) {
        container.item.data.sorting_art = false;
        btn_atr_sorting.setHidden(false)
        btn_atr_sorting_remove.setHidden(true)
      },
      failure: function (response) {
        try {
          //TODO gestire messaggi di errore
          const record = Ext.decode(response.responseText);
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });
  },
  onNewAtr: function (btn) {
    //TODO gestire messaggi di errore
    let me = this,
      container = btn.up('#widgetContainer');

    Ext.Ajax.request({
      method: "POST",
      url: Backend.REST_API + 'grids/articoli/changeSortingAtr',
      jsonData: {
        id: container.id_art, data: container.item.data, step: 10
      },
      success: function (response) {
        const obj = Ext.decode(response.responseText);
        me.windowEditSorting(obj, container, true)
      },
      failure: function (response) {
        try {
          const record = Ext.decode(response.responseText);
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });
  },

  onChangeSorting: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer');

    Ext.Ajax.request({
      method: "POST",
      url: Backend.REST_API + 'grids/articoli/changeSortingAtr',
      jsonData: {
        id: container.id_art, data: container.item.data, step: 10
      },
      success: function (response) {
        const obj = Ext.decode(response.responseText);
        me.windowEditSorting(obj, container)
      },
      failure: function (response) {
        try {
          const record = Ext.decode(response.responseText);
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });

  },

  windowEditSorting: function (obj, container, isNew = false) {
    let win = Ext.create("itm.grids.articolisito.editSorting.Windows", {
      containerGrid: container,
      storeAttributi: obj.storeAttributi, // elenco completo attributi per questa selezione ordinati
      record: container.item.data,
      listAtr: container.storeAttributi.data.items, // elenco attributi inseriti per questo articolo
      actionSave: container.onSave, // flag se arriva dal savataggio e non da tasto vista
      isNew: isNew
    });

    // container.onSave = false;
    win.on('closeWindow', 'onCloseWindowSorting', this, { win, container })
    win.show();
  },

  onCloseWindowSorting: function (obj) {
    let me = this,
      panel = obj.win.containerGrid.pnlRow,
      descrizione_estesa = panel.down('#descrizione_estesa').getValue(),
      descrizione = panel.down('#descrizione').getValue()

    obj.win.containerGrid.new_descrizione = descrizione;

    if (obj.win.actionSave) {
      let attributi = []
      for (let item of obj.win.listAtr) {
        attributi.push(item.data);
      }

      this.onSaveRowWidgetOk(
        { id: obj.win.record.id, descrizione: descrizione, descrizione_estesa: descrizione_estesa, storeAttributi: attributi },
        obj.container,
        obj.container.down('saveBtn'))
    } else {
      obj.storeAttributi.push({
        action: 1, isnew: 1, id: me.randomString(32), id_art: obj.win.record.id, id_atr: '', valore: '', attributo: ''
      })
      obj.container.storeAttributi.loadData(obj.storeAttributi)
    }

  },
  onHandlerAction: function (view, rowIndex, colIndex, item, event, record) {
    let grid = view.up('grid'),
      lastrecord = grid.getStore().last();

    const panel = view.up('#widgetContainer')
    panel.down('#saveBtn').setUi('red');
    if (record.get('action') === 2) {
      record.set('action', 0)
    } else {
      if (record.data.isnew === 0) {
        record.set('action', 2)
      } else {
        record.set('id_atr', "")
        if (lastrecord !== record) {
          view.getStore().remove(record);
        }
      }
    }
  },

  onBeforeAttributo: function (cmb, record) {

    if (record.get('recordDup')) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        message: Locale.t('itm.grids.articoli.gridattributi.duplicato'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return false
    };

  },
  onSelectAttributo: function (cmb, record) {
    let grid = cmb.up('grid');
    let container = cmb.up('#widgetContainer');

    container.down('#saveBtn').setUi('red');

    let id_art = container.id_art;
    let row = grid.getSelectionModel().getSelection()[0];
    row.data['id_atr'] = record.data['id'];


    // Verifica se ho l'ordinamento dell'attributo
    let index = container.item.data.attributiSorting.findIndex((el) => el.id_atr === record.data["id"])
    if (index === -1) {
      row.data['sorting'] = null;
    } else {
      row.data['sorting'] = container.item.data.attributiSorting[index].sorting;
    }


    grid.getView().refreshNode(row)
    let task = new Ext.util.DelayedTask(function (cmb) {
      cmb.ownerCt.completeEdit();
    }, this, [cmb])
    task.delay(100)

    let lastrecord = grid.getStore().last()
    if (lastrecord === row) {
      grid.getStore().add(Ext.create('itm.forms.articolo.component.gridAttributi.ModelAttributi', {
        action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), id_art: id_art, id_atr: '', valore: '', attributo: ''
      }))

    }
  },
  onSaveRowWidget: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer'),
      panel = container.pnlRow,
      store = container.storeAttributi,
      descrizione_estesa = panel.down('#descrizione_estesa').getValue(),
      descrizione = panel.down('#descrizione').getValue(),
      attributi = [];

    let msgField = '', isSorting = true;
    if (descrizione.trim() == '') {
      msgField += `${Locale.t('itm.grids.articoli.gridattributi.ripristina.assente.descrizione')}<br>`;
    }
    for (let item of store.data.items) {
      if (item.data.sorting === null) {
        isSorting = false;
      }
      if (item.data.valore === '' && item.data.id_atr !== '') {
        msgField += `${Locale.t('itm.grids.articoli.gridattributi.ripristina.assente.attributo')} ${item.data.attributo}<br>`;
      }
      attributi.push(item.data);
    }

    if (msgField !== '') {

      Ext.Msg.show({
        title: Locale.t("global.attenzione"), message: msgField, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESCANCEL, ui: "red",
        buttonText: {
          yes: Locale.t('itm.grids.articoli.gridattributi.ripristina.yes'),
          cancel: Locale.t('itm.grids.articoli.gridattributi.ripristina.cancel')
        },
        fn: function (action) {
          if (action === "cancel") {
            return;
          }
          let data = []
          for (let r of container.storeAttributi.data.items) {
            if (r.data.isCopy !== true)
              data.push(r.data)
          }
          container.storeAttributi.loadData(data)
        }
      })

      return;
    }

    // Verifico se ho degli attributi senza sorting 
    if (!isSorting) {
      container.onSave = true
      let btn_atr_sorting_change = container.down('#btn_atr_sorting_change');

      this.onChangeSorting(btn_atr_sorting_change)
      return;
    }

    container.new_descrizione = descrizione;
    this.onSaveRowWidgetOk(
      { id: container.id_art, descrizione: descrizione, descrizione_estesa: descrizione_estesa, storeAttributi: attributi },
      container,
      btn)
  },
  onSaveRowWidgetOk: function (jsonData, container, btn) {
    let me = this

    Ext.Ajax.request({
      method: "PUT",
      url: Backend.REST_API + 'grids/articoli/setRowWidget',
      jsonData: jsonData,
      success: function (response) {
        const obj = Ext.decode(response.responseText);
        me.nextSaveRow(obj, container, btn);
      },
      failure: function (response) {
        try {
          const record = Ext.decode(response.responseText);
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {

          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });
  },
  nextSaveRow: function (obj, container, btn) {
    let me = this;
    if (!obj && obj.length === 0) {
      container.down('#saveOk').hide()
      container.down('#errorOk').show()

      new Ext.util.DelayedTask(function () {
        container.down('#saveOk').hide()
        container.down('#errorOk').hide()
      }, container).delay(2000);

      return;
    }

    me.nextSaveLoad(obj, container);
  },
  nextSaveLoad: function (obj, bodyComponent) {
    let panel = bodyComponent.pnlRow
    // recupero info
    let me = this,
      grid = this.getView();

    // Aggiorno dato su grid
    bodyComponent.current_row.data.descrizione = bodyComponent.new_descrizione
    bodyComponent.current_row.data.tot_atr = obj.data.storeAttributi.length
    grid.getView().refreshNode(bodyComponent.current_row)

    bodyComponent.down('#saveBtn').setUi('ocra');
    bodyComponent.down('#saveOk').show()
    bodyComponent.down('#errorOk').hide()

    bodyComponent.down('#btnCopyHtml').setText(obj.data.length_descrizione_estesa)

    new Ext.util.DelayedTask(function () {
      bodyComponent.down('#saveOk').hide()
      bodyComponent.down('#errorOk').hide()
    }, bodyComponent).delay(2000);


    let newData = []
    for (let r of obj.data.storeAttributi) {
      if (r.action !== 2 && r.isnew !== 1) {
        newData.push(r);
      }
    }
    bodyComponent.storeAttributi.loadData(newData)

    bodyComponent.storeAttributi.add(Ext.create('itm.grids.articolisito.gridAttributi.ArticoliModelAttributi', {
      action: 1, isnew: 1, id: me.randomString(32), id_art: bodyComponent.id_art, id_atr: '', valore: '', attributo: ''
    })
    )

    bodyComponent.descrizione_estesa = obj.data.descrizione_estesa
    bodyComponent.descrizione = obj.data.descrizione
    bodyComponent.id_art = obj.data.id
    bodyComponent.item = obj

    panel.down('#descrizione_estesa').setValue(obj.data.descrizione_estesa)
    descrizione = panel.down('#descrizione').setValue(obj.data.descrizione)

  },
  onSaveRowWidgetListAtr: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer'),
      list = []

    for (let r of container.storeAttributiListAtr.data.items) {
      list.push(r.data)
    }

    Ext.Ajax.request({
      method: "PUT",
      url: Backend.REST_API + 'grids/articoli/setRowWidgetListAtr',
      jsonData: {
        id: container.id_art,
        list: list
      },
      success: function (response) {
        const obj = Ext.decode(response.responseText);
        me.nextSaveRowListAtr(obj, container, btn);
      },
      failure: function (response) {
        try {
          const record = Ext.decode(response.responseText);
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: record['msg'],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        } catch (e) {

          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            message: e.message,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
        }
      }
    });
  },
  ontoggleGrid: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer')

    if (btn.stato === 0) {
      container.panelCard.setActiveItem(1);
    } else if (btn.stato === -1) {
      container.panelCard.setActiveItem(0);
    } else {
      this.onSaveRowWidgetListAtr(btn)
      container.panelCard.setActiveItem(0);
    }
  },
  onCopyRowAttributi: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer')

    me.copyAttributi = container.item.data.storeAttributi;
    me.copy_data = container.current_record

    container.down('#copyOk').show()
    new Ext.util.DelayedTask(function () {
      container.down('#copyOk').hide()
    }, container).delay(2000);
  },
  onCopyRowDescrizioneEstesa: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer')

    me.copy_descrizioneEstesa = container.pnlRow.down('#descrizione_estesa').getValue()
    container.down('#copyDescrEstOk').show()
    new Ext.util.DelayedTask(function () {
      container.down('#copyDescrEstOk').hide()
    }, container).delay(2000);
  },
  onCopyDescrizione: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer')
    me.copyDescrizione = container.item;
    me.copy_data = container.current_record


    container.down('#copyDescrOk').show()
    new Ext.util.DelayedTask(function () {
      container.down('#copyDescrOk').hide()
    }, container).delay(2000);
  },

  copyTextToClipboard: function (text, container) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if the element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a
    // flash, so some of these are just precautions. However in
    // Internet Explorer the element is visible whilst the popup
    // box asking the user for permission for the web page to
    // copy to the clipboard.
    //

    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      // var msg = successful ? 'successful' : 'unsuccessful';
      if (successful) {
        container.down('#copyHtmlOk').show()
        new Ext.util.DelayedTask(function () {
          container.down('#copyHtmlOk').hide()
        }, container).delay(2000);
      }
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  },

  onGetRowDescrizioneEstesa: function (btn) {

    let me = this,
      container = btn.up('#widgetContainer');

    me.copyTextToClipboard(container.item.data.descrizione_estesa_html, container)

    let w = Ext.create('Ext.window.Window', {
      width: 800,
      heigth: 600,
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",

          items: [
            {
              text: Locale.t("global.btn.close.text"),
              handler: function (btn) {
                let w = btn.up('window')
                w.destroy();
              },
              iconCls: "x-fas fa-times",
            },
          ],
        },
      ],
      items: [
        {
          xtype: 'container',
          html: container.item.data.descrizione_estesa_html
        }
      ]

    })
    // w.show()
  },
  onPasteRowDescrizioneEstesa: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer'),
      panel = container.pnlRow;

    if (!me.copy_descrizioneEstesa) {
      return
    }
    panel.down('#saveBtn').setUi('red');
    panel.down('#descrizione_estesa').setValue(me.copy_descrizioneEstesa)
    container.down('#pasteDescrEstOk')
    container.down('#pasteDescrEstOk').show()
    new Ext.util.DelayedTask(function () {
      container.down('#pasteDescrEstOk').hide()
    }, container).delay(1500);
  },
  onPasteRowDescrizione: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer'),
      panel = container.pnlRow;

    if (!me.copyDescrizione) {
      return
    }
    panel.down('#saveBtn').setUi('red');
    panel.down('#descrizione').setValue(me.copy_data.descrizione)
    container.down('#pasteDescrOk')
    container.down('#pasteDescrOk').show()
    new Ext.util.DelayedTask(function () {
      container.down('#pasteDescrOk').hide()
    }, container).delay(1500);
  },
  onPasteRowAttributi: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer');

    if (!me.copyAttributi) {
      return;
    }
    let data = me.onMergeAttrinuti(btn)
    container.storeAttributi.loadData(data)
    container.storeAttributi.add(Ext.create('itm.grids.articolisito.gridAttributi.ArticoliModelAttributi', {
      action: 1, isnew: 1, id: me.randomString(32), id_art: container.current_record.id, id_atr: '', valore: '', attributo: ''
    }))
    container.down('#pasteOk').show()
    new Ext.util.DelayedTask(function () {
      container.down('#pasteOk').hide()
    }, container).delay(1500);
  },
  onMergeAttrinuti: function (btn) {
    let me = this,
      container = btn.up('#widgetContainer'),
      data = [],
      pasteAtr = me.getViewModel().get('pasteAtr');

    container.down("#saveBtn").setUi('red')
    for (let r of container.storeAttributi.data.items) {
      if (r.data.id_atr !== '')
        data.push(r.data)
    }

    for (let r of me.copyAttributi) {
      if (r.id_atr !== '') {
        let check = data.filter(el => el.id_atr === r.id_atr)
        let new_r = { ...r };
        if (check.length === 0) {
          // verifico sorting
          let index = container.item.data.attributiSorting.findIndex((el) => el.id_atr === r.id_atr)
          if (index === -1) {
            new_r.sorting = null;
          } else {
            new_r.sorting = container.item.data.attributiSorting[index].sorting;
          }
          if (!pasteAtr) {
            new_r.valore = ''
          }
          new_r.id = me.randomString(32);
          new_r.isCopy = true;
          new_r.isnew = 1;
          new_r.action = 1;
          new_r.id_art = container.current_record.id;
          data.push(new_r)
        }
      }
    }
    return data;
  },
  onChangeHtml: function (field, newValue, oldValue) {
    if (oldValue !== '' && oldValue !== newValue) {
      let container = field.up('#widgetContainer')
      container.down('#saveBtn').setUi('red');
    }
  },

  // settaggio tasto save + conteggio caratteri descrizione
  onKeyupField: function (field) {

    let container = field.up('#widgetContainer')
    container.down('#saveBtn').setUi('red');

    if (field.itemId === 'descrizione') {
      let length = field.getValue().length;
      let max = field.maxLength
      let fieldLabel = field.getFieldLabel()
      if (field.fieldLabel_old && field.fieldLabel_old !== fieldLabel) {
        fieldLabel = field.fieldLabel_old
      } else {
        field.fieldLabel_old = fieldLabel
      }
      field.setFieldLabel(`${fieldLabel} <span style="font-size:xx-small;">[${length}/${max}]</style>`)
    }
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
  },
  onLoadStore: function (store, records, success) {
    if (success) {
      if (store.totalCount < 501) {
        this.getViewModel().set("disableFindReplace", false);
      }
      else {
        this.getViewModel().set("disableFindReplace", true);
      }
    }
    else {
      this.getViewModel().set("disableFindReplace", true);
    }
    this.callParent(arguments)
  },

  onToggleFiltroPadre: function (btn) {
    if (btn.stato === 0) {
      btn.setText("Filtro padri ATTIVO")
      btn.stato = 1
      this.getViewModel().getStore("store").getProxy().extraParams.filterPadre = 1;

    } else {
      btn.setText("Filtro padri DISATTIVO")
      btn.stato = 0
      this.getViewModel().getStore("store").getProxy().extraParams.filterPadre = 0;
    }
  },
  onModificaDesc: function (btn) {
    let extraParams = this.getViewModel().getStore("store").getProxy().extraParams;
    let win = Ext.create("itm.grids.articolisito.modDescr.Windows", {
      extraParams: extraParams,
    });
    win.on('closeWindow', 'onCloseWindow', this)
    win.show();

  },
  onCloseWindow: function () {
    this.getView().getStore().load();
  },
})

