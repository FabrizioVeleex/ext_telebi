/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.attributi.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.attributi',
  requires: [
    'Ext.grid.column.Action',
    'itm.grids.attributi.Model',
    'itm.forms.attributo.Panel',
    'portal.util.Functions'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]
    if (this.checkRuoli(['99', '9'])) {
      this.listBtnTop.push({
        tooltip: Locale.t('itm.grids.attributi.btn.new.tooltip'),
        text: Locale.t('itm.grids.attributi.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onNew'
      });
      this.listBtnTop.push({
        text: Locale.t('itm.grids.attributi.btn.savesorting.text'),
        ui: 'blue',
        iconCls: 'x-fas fa-save',
        disabled: true,
        handler: 'onSaveSorting',
        bind: {
          disabled: '{!saveChanged}'
        }
      });
      //TODO vedere se serve
      // this.listBtnTop.push({
      //   text: Locale.t('itm.grids.attributi.btn.removeatr.text'),
      //   ui: 'red',
      //   iconCls: 'x-fas fa-save',
      //   disabled: true,
      //   handler: 'onRemoveAtr',
      //   bind: {
      //     disabled: '{!removeAtr}'
      //   }
      // });
    }

    if (this.checkRuoli(['99'])) {
      this.listBtnTop.push('->')
      this.listBtnTop.push({
        text: 'Dev',
        handler: function () { Ext.Ajax.request({ method: "get", url: Backend.REST_API + "dev" }) }
      })
    }
    this.callParent(arguments)
    // if (this.toolbarFooter && this.toolbarFooter.items.items[0]) { this.toolbarFooter.items.items[0].hide() }

  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('itm.grids.attributi.Model', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, NewRecord, 1);
  },
  onBeforeDrop: function (node, data, overModel, dropPosition, dropHandlers) {
    // Verifico se ho un filtro inserito
    let proxy = this.getViewModel().getStore('store').getProxy();
    if (proxy.extraParams && typeof proxy.extraParams === 'object' && proxy.extraParams.pattern && proxy.extraParams.pattern !== '') {
      dropHandlers.cancelDrop()
      this.getViewModel().set('saveChanged', false)
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        message: Locale.t("itm.grids.attributi.disableord"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      })
    } else {
      // Setto record per evidenziare lo spostamento
      data.records[0].set('changed', true)
      // cambio il valore per abilitare il tasto di salvataggio ordinamento
      this.getViewModel().set('saveChanged', true)
      this.getViewModel().set('removeAtr', false)
    }
  },

  onAddFilter: function (node) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore('store');
    let id_clm = node.data.id_clm ? node.data.id_clm : '',
      id_fam = node.data.id_fam ? node.data.id_fam : '',
      id_gruppo = node.data.id_gruppo ? node.data.id_gruppo : '',
      id_sottogruppo = node.data.id_sottogruppo ? node.data.id_sottogruppo : ''

    store.getProxy().extraParams.id_clm = id_clm;
    store.getProxy().extraParams.id_fam = id_fam;
    store.getProxy().extraParams.id_gruppo = id_gruppo;
    store.getProxy().extraParams.id_sottogruppo = id_sottogruppo;
    store.load();
  },


  onBeforeLoadStore: function () {
    this.getViewModel().set('saveChanged', false)
    this.getViewModel().set('removeAtr', false)
  },
  onRemoveAtr: function () {
    let me = this,
      store = me.getViewModel().getStore('store'),
      row = me.getView().getSelectionModel().getSelection()[0];

    if (row) {
      // Recupero record selezionato
      Ext.Ajax.request({
        url: Backend.REST_API + "grids/attributi/removeAtr/",
        method: "DELETE",
        jsonData: {
          step: 10,
          id: row.data.id,
          extraParams: store.getProxy().extraParams
        },
        success: function (response) {
          const obj = Ext.decode(response.responseText);
          me.onRemoveAtrNext(obj)
        },
        failure: function (response) {
          //TODO gestire errore
          console.log('errore')
        },
      });
    }
  },
  onRemoveAtrNext: function (obj) {
    try {

      // presento msg  con info per eccezzione cancellazione list >0
      // presento windows con info per cancellazione list =0
      let msg = 'Non è possibile rimuovere questo attributo perche ci sono degli articoli associati',
        icon = "ERRORE"

      if (obj.data.length === 0) {
        msg = "Procedere con al rimozione di questo attributo associato alla sequente combinazione?"
        icon = "QUESTION"

      }

      let grid = Ext.create("Ext.grid.Panel", {

      })
      let window = Ext.create("Ext.window.Window", {

      })

    } catch (error) {

    }
  },
  onSelectRow: function (view, record) {
    this.getViewModel().set('removeAtr', true)
  },
  onSaveSorting: function () {
    let me = this,
      store = this.getViewModel().getStore('store'),
      newSort = store.data.items.map(el => el.data.id)

    // avvio salvataggio ordinamento
    Ext.Ajax.request({
      url: Backend.REST_API + "grids/attributi/saveSort/",
      method: "POST",
      jsonData: {
        newSort: newSort,
        extraParams: store.getProxy().extraParams
      },
      success: function (response) {
        me.reloadGrid()
      },
      failure: function (response) {
        //TODO gestire errore
        console.log('errore')
      },
    });
  },
  reloadGrid: function () {
    this.getViewModel().set('saveChanged', false)
    this.getViewModel().set('removeAtr', false)
    this.callParent(arguments)
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('itm.forms.attributo.Panel', {
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
      { text: Locale.t('itm.grids.attributi.column.sorting'), dataIndex: 'sorting', width: 150, filter: { type: 'numeric' } },
      // { text: Locale.t('itm.grids.attributi.column.codice'), dataIndex: 'codice', flex: 1, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.attributi.column.attributo'), dataIndex: 'attributo', flex: 1, filter: { type: 'string' } }
    ]
    this.callParent(arguments)
  }
})